
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import initPlayerPoints from '../../playerPointsData.json';
import Board from '../components/Board';
import { IPoint } from '../../domain/models/Point';
import ShipsPlacement from '../components/Ship/ShipsPlacement';
import { ShipData } from '../../domain/models/Ship';
import { useSetUpGame } from '../../domain/usecases/setUpGame';

import socket from '../../infra/services/socket'
import { Coordinate } from '../../domain/valueObjects/Coordinate';
import { EAppStep } from '../../domain/enums/AppStep';

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

  useEffect(() => {
    setPlayerBoardData(initPlayerPoints as unknown as IPoint[][]);
    setOppBoardData(initPlayerPoints as unknown as IPoint[][]);
  }, []);

  useEffect(() => {
    socket.on('startGame', (isFullRoom: boolean) => {
      setIsFullRoom(isFullRoom);
    })
  }, [isFullRoom])

  const handlePlaceShipOnBoard = (location: Coordinate): void => {
    alert('Placing');
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

  const readyToPlay = (): void => {
    socket.emit('isPlayerReadyToPlay', params.gameId, player.name, true)
    //setStep(EAppStep.Waiting)
    socket.on("isPlayerReadyToPlayToClient", (playerName, isOpponentReady) => {
      console.log("mabite");
      console.log(playerName, "playerName");
      console.log(isOpponentReady, "isOpponentReady");
    });

    // socket.on("isGameReadyToStart", isGameReady => {
    //   console.log(isGameReady, "Gameready");
    // });
  }

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
                  ocean={playerBoardData}
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
              <button onClick={() => readyToPlay()}>Ready</button>
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
          ) ||
          step === EAppStep.Waiting && (
            <h2>Waiting your opponent...</h2>
          )

        }
      </div>
    </main>
  );
}

export default BoardGamePage;
