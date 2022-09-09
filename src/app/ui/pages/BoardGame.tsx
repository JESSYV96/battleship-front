import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import initPlayerPoints from '../../playerPointsData.json';
import Board from '../components/Board';
import ShipsPlacement from '../components/Ship/ShipsPlacement';
import { ShipData } from '../../domain/models/Ship';
import { useSetUpGame } from '../../domain/usecases/setUpGame';
import { Location } from '../../domain/models/Location';
import socket from '../../infra/services/socket';
import { IPoint } from '../../domain/models/Point';
import { GameContext } from '../../contexts/gameContext';
import { Coordinate } from '../../domain/valueObjects/Coordinate';
import { EAppStep } from '../../domain/enums/AppStep';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialShipsToPlace: ShipData[] = [
  { size: 2, name: 'Destroyer', orientation: 'horizontal' },
  { size: 3, name: 'Submarine', orientation: 'horizontal' },
  { size: 3, name: 'Cruiser', orientation: 'horizontal' },
  { size: 4, name: 'Battleship', orientation: 'horizontal' },
  { size: 5, name: 'Carrier', orientation: 'horizontal' },
];

function BoardGamePage() {
  const params = useParams();
  const location = useLocation();
  const setUpGame = useSetUpGame();
  const [isFullRoom, setIsFullRoom] = useState<boolean>(false);
  const [player, setPlayer] = useState<IPlayer>(location.state as IPlayer);

  // Game State
  const [step, setStep] = useState<EAppStep>(EAppStep.Placing);

  // Placement states
  const [shipsToPlace, setShipsToPlace] =
    useState<ShipData[]>(initialShipsToPlace);
  const [shipsPlaced, setShipsPlaced] = useState(false);
  const [activeShipBeingPlaced, setActiveShipBeingPlaced] =
    useState<ShipData | null>(null);

  // Player states
  const [playerBoardData, setPlayerBoardData] = useState<IPoint[][] | null>(
    null
  );
  const [oppBoardData, setOppBoardData] = useState<IPoint[][] | null>(null);
  const [ctaText, setCtaText] = useState<string>('');

  const gameContext = React.useContext(GameContext);

  useEffect(() => {
    setPlayerBoardData(initPlayerPoints as unknown as IPoint[][]);
    setOppBoardData(initPlayerPoints as unknown as IPoint[][]);
  }, []);

  useEffect(() => {
    socket.on('startGame', (isFullRoom: boolean) => {
      setIsFullRoom(isFullRoom);
    });
  }, [isFullRoom]);

  const handlePlaceShipOnBoard = (location: Location): void => {
    // alert('Placing');
    // setPlacementError(null)
    if (!activeShipBeingPlaced) return;
    // await post('/player/place', { ship: activeShipBeingPlaced, location: location })

    // Update board
    // const res = await get('/boards')
    gameContext.game?.player.placeShip(activeShipBeingPlaced, location);
    // setPlayerBoardData(res.playerBoard)

    // Update ships to place
    const shipsLeftToPlace = shipsToPlace.filter(
      (s) => s.name !== activeShipBeingPlaced.name
    );
    setShipsToPlace(shipsLeftToPlace);
    setActiveShipBeingPlaced(null);

    // All ships have been placed, start guessing
    if (shipsLeftToPlace.length === 0) {
      setShipsPlaced(true);
      setCtaText("Great! Now it's time to search for your opponents ships.");
    }
  };

  const handleGuess = (location: Coordinate): void => {
    alert('Guessing');
  };

  const handleShipClick = (ship: any): void => {
    //if (placementError) setPlacementError(null);
    if (activeShipBeingPlaced === ship) setActiveShipBeingPlaced(null);
    else setActiveShipBeingPlaced(ship);
  };

  const handleSwapShipOrientation = (ship: ShipData): void => {
    let target: ShipData | undefined = shipsToPlace.find((s) => s === ship);
    if (!target) console.error('Target ship not found in fleet to rotate.');

    const updatedFleet: ShipData[] = shipsToPlace.map((s) => {
      if (s.name === ship.name) {
        return s.orientation === 'horizontal'
          ? { ...s, orientation: 'vertical' }
          : { ...s, orientation: 'horizontal' };
      } else {
        return s;
      }
    });
    setShipsToPlace(updatedFleet);
    setActiveShipBeingPlaced(null);
  };

  const readyToPlay = (e: any): void => {
    e.preventDefault();
    setPlayer({ ...player, isReadyToPlay: true });
    socket.emit(
      'isPlayerReadyToPlay',
      params.gameId,
      player.name,
      player.isReadyToPlay
    );
    setStep(EAppStep.Waiting);
  };

  socket.on('isPlayerReadyToPlayToClient', (playerName, isOpponentReady) => {
    console.log(isOpponentReady, 'isOpponentReady');
    toast.warn(`${playerName} is ready`);
  });

  socket.on('isGameReadyToStart', (isGameReady) => {
    toast.info('The game is ready to start');
  });

  return (
    <main>
      <div style={{ display: 'flex', gap: '20px' }}>
        {!isFullRoom ? (
          <h1>
            En attente de l'adversaire{' '}
            {process.env.REACT_APP_BASE_URL_APP &&
              params.gameId &&
              setUpGame.getJoinGameLink(
                process.env.REACT_APP_BASE_URL_APP,
                params.gameId
              )}
          </h1>
        ) : (
          (step === EAppStep.Placing && (
            <div className="grid">
              <h2>Placing, {player.name}</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Board
                  variant="player"
                  ocean={gameContext.game!.player.board.ocean}
                  step={step}
                  onPlaceShip={handlePlaceShipOnBoard}
                  onGuess={handleGuess}
                />
                {shipsPlaced ? (
                  <button onClick={() => console.log('Ships Placed')}>
                    Confirm Placement
                  </button>
                ) : (
                  <ShipsPlacement
                    ships={shipsToPlace}
                    activeShipToPlace={activeShipBeingPlaced}
                    onShipClick={handleShipClick}
                    onChangeOrientation={handleSwapShipOrientation}
                  />
                )}
              </div>
              <button onClick={(e) => readyToPlay(e)}>Ready</button>
            </div>
          )) ||
          (step === EAppStep.Guessing && (
            <div className="grid">
              <h2>Guessing, {player.name}</h2>
              <div className="col col-8">
                <Board
                  variant="player"
                  ocean={playerBoardData}
                  step={step}
                  onPlaceShip={handlePlaceShipOnBoard}
                  onGuess={handleGuess}
                />
                <Board
                  variant="player"
                  ocean={oppBoardData}
                  step={step}
                  onPlaceShip={handlePlaceShipOnBoard}
                  onGuess={handleGuess}
                />
              </div>
            </div>
          )) ||
          (step === EAppStep.Waiting && <h2>Waiting your opponent...</h2>)
        )}
        <ToastContainer />
      </div>
    </main>
  );
}

export default BoardGamePage;
