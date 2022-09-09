
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import initPlayerPoints from '../../playerPointsData.json';
import Board from '../components/Board';
import { EAppStep } from '../../domain/models/Game';
import ShipsPlacement from '../components/Ship/ShipsPlacement';
import { useSetUpGame } from '../../domain/usecases/setUpGame';
import { Location } from '../../domain/models/Location'

import socket from '../../infra/services/socket'
import { EShipOrientation, ShipData } from '../../domain/models/Ship';
import { IPoint } from '../../domain/models/Point';

import { GameContext } from '../../contexts/gameContext'

const initialShipsToPlace: ShipData[] = [
  { size: 2, name: 'Destroyer', orientation: EShipOrientation.Horizontal },
  { size: 3, name: 'Submarine', orientation: EShipOrientation.Horizontal },
  { size: 3, name: 'Cruiser', orientation: EShipOrientation.Horizontal },
  { size: 4, name: 'Battleship', orientation: EShipOrientation.Horizontal },
  { size: 5, name: 'Carrier', orientation: EShipOrientation.Horizontal },
];


function BoardGamePage() {
  const params = useParams();
  const location = useLocation();
  const setUpGame = useSetUpGame();
  const [isFullRoom, setIsFullRoom] = useState<boolean>(false)
  const player = location.state as IPlayer;

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

  const gameContext = React.useContext(GameContext)

  useEffect(() => {
    setPlayerBoardData(initPlayerPoints as unknown as IPoint[][]);
    setOppBoardData(initPlayerPoints as unknown as IPoint[][]);
  }, []);

  useEffect(() => {
    socket.on('startGame', (isFullRoom: boolean) => {
      setIsFullRoom(isFullRoom);
    })
  }, [isFullRoom])

  const handlePlaceShipOnBoard = (location: Location): void => {
    // alert('Placing');
    // setPlacementError(null)
    if (!activeShipBeingPlaced) return
    // await post('/player/place', { ship: activeShipBeingPlaced, location: location })

    // Update board
    // const res = await get('/boards')
    gameContext.game?.player.placeShip(activeShipBeingPlaced, location)
    // setPlayerBoardData(res.playerBoard)

    // Update ships to place
    const shipsLeftToPlace = shipsToPlace.filter(s => s.name !== activeShipBeingPlaced.name)
    setShipsToPlace(shipsLeftToPlace)
    setActiveShipBeingPlaced(null)

    // All ships have been placed, start guessing
    if (shipsLeftToPlace.length === 0) {
      setShipsPlaced(true)
      setCtaText("Great! Now it's time to search for your opponents ships.")
    }
  };

  const handleGuess = (location: Location): void => {
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
        return s.orientation === EShipOrientation.Horizontal
          ? { ...s, orientation: EShipOrientation.Vertical }
          : { ...s, orientation: EShipOrientation.Horizontal };
      } else {
        return s;
      }
    });
    setShipsToPlace(updatedFleet);
    setActiveShipBeingPlaced(null);
  };

  return (
    <main>
      <div style={{ display: 'flex', gap: '20px' }}>
        {!isFullRoom
          ?
          <h1>En attente de l'adversaire  {(process.env.REACT_APP_BASE_URL_APP && params.gameId) && setUpGame.getJoinGameLink(process.env.REACT_APP_BASE_URL_APP, params.gameId)}</h1>
          :
          step === EAppStep.Placing && (
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
            </div>
          ) ||
          step === EAppStep.Guessing && (
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
          )
        }
      </div>
    </main>
  );
}

export default BoardGamePage;
