import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import initPlayerPoints from '../../playerPointsData.json';
import initOpponentPoints from '../../opponentPointsData.json';
import Board from '../components/Board';
import { Location, IPoint } from '../../domain/models/Point';
import { EAppStep } from '../../domain/models/Game';
import ShipsPlacement from '../components/Ship/ShipsPlacement';
import { ShipData } from '../../domain/models/Ships';

const initialShipsToPlace: ShipData[] = [
  { size: 2, name: 'Destroyer', orientation: 'horizontal' },
  { size: 3, name: 'Submarine', orientation: 'horizontal' },
  { size: 3, name: 'Cruiser', orientation: 'horizontal' },
  { size: 4, name: 'Battleship', orientation: 'horizontal' },
  { size: 5, name: 'Carrier', orientation: 'horizontal' },
];

function BoardGamePage() {
  const location = useLocation();
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

  const handlePlaceShipOnBoard = (location: Location): void => {
    alert('Placing');
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

  return (
    <main>
      <div style={{ display: 'flex', gap: '20px' }}>
        {step === EAppStep.Placing && (
          <div className="grid">
            <h2>Placing</h2>
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
          </div>
        )}
        {step === EAppStep.Guessing && (
          <div className="grid">
            <h2>Guessing</h2>
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
        )}
      </div>
    </main>
  );
}

export default BoardGamePage;
