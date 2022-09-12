import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Board from '../components/Board';
import ShipsPlacement from '../components/Ship';
import { ShipData } from '../../domain/models/Ship';
import { useSetUpGame } from '../../domain/usecases/setUpGame';
import { Location } from '../../domain/models/Location';
import { GameContext } from '../contexts/gameContext';
import { Coordinate } from '../../domain/valueObjects/Coordinate';
import { EAppStep } from '../../domain/enums/AppStep';
import socket, { registerToGameSetUpHandlers } from '../../infra/services/socket.io/socket';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialShipsToPlace: ShipData[] = [
  { size: 2, name: 'Destroyer', orientation: 'horizontal' },
  { size: 3, name: 'Submarine', orientation: 'horizontal' },
  { size: 3, name: 'Cruiser', orientation: 'horizontal' },
  { size: 4, name: 'Battleship', orientation: 'horizontal' },
  { size: 5, name: 'Carrier', orientation: 'horizontal' },
]

function BoardGamePage() {
  const params = useParams();
  const setUpGame = useSetUpGame();

  // Placement states
  const [shipsToPlace, setShipsToPlace] =
    useState<ShipData[]>(initialShipsToPlace);
  const [shipsPlaced, setShipsPlaced] = useState(false);
  const [activeShipBeingPlaced, setActiveShipBeingPlaced] =
    useState<ShipData | null>(null);
  const [turn, setTurn] = useState<number>(1)


  const [ctaText, setCtaText] = useState<string>('');

  const { game, step, setStep, haveAllPlayersInGame, setHaveAllPlayersInGame, playingPlayer, setPlayingPlayer } = useContext(GameContext);

  useEffect(() => {
    return () => {
      registerToGameSetUpHandlers(socket)
        .playerReadyToPlay((playerName, isOpponentReady, board) => {
          for (let i = 0; i < board.ocean.length; i++) {
            for (let j = 0; j < board.ocean[i].length; j++) {
              game.opponent.board.ocean[i][j].updateStatus(board.ocean[i][j].status)
            }
          }
          toast.info(`${playerName} is ready`)
        })

      registerToGameSetUpHandlers(socket)
        .gameReadyToStart(() => {
          const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
          toast.promise(
            resolveAfter3Sec,
            {
              pending: 'La partie va bientôt commencer'
            }
          ).then(() => setStep(EAppStep.Guessing)).catch(err => console.log(err))
        })

      registerToGameSetUpHandlers(socket).opponentHasPlayed((updatedBoard, attackingPlayer) => {
        for (let i = 0; i < updatedBoard.ocean.length; i++) {
          for (let j = 0; j < updatedBoard.ocean[i].length; j++) {
            game.player.board.ocean[i][j].updateStatus(updatedBoard.ocean[i][j].status)
          }
        }
        setPlayingPlayer(game.player.name)
      })
    }
  }, []);

  useMemo(() => {
    registerToGameSetUpHandlers(socket)
      .gameStart((isFullRoom: boolean) => {
        setHaveAllPlayersInGame(isFullRoom);
      })
  }, [])

  const handlePlaceShipOnBoard = (location: Location): void => {
    // alert('Placing');
    // setPlacementError(null)
    if (!activeShipBeingPlaced) return;
    // await post('/player/place', { ship: activeShipBeingPlaced, location: location })

    // Update board
    // const res = await get('/boards')
    game?.player.placeShip(activeShipBeingPlaced, location);
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
    if (playingPlayer === game.player.name) {
      console.log('guessingggg')
      game.player.makeGuess(location, game.opponent)

      socket.emit(
        'updateBoard',
        params.gameId,
        game?.opponent.board,
        game?.player,
      );
      setTurn(turn + 1)
      setPlayingPlayer(game.opponent.name)
    }
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
    game.player.isReadyToPlay = true
    socket.emit(
      'isPlayerReadyToPlay',
      params.gameId,
      game.player.name,
      game.player.isReadyToPlay,
      game.player.board
    );
    setStep(EAppStep.Waiting);
  };

  return (
    <main>
      <div style={{ display: 'flex', gap: '20px' }}>
        {!haveAllPlayersInGame ? (
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
              <h2>Placing, {game.player.name}</h2>
              <div style={{ display: 'flex', gap: '20px' }}>
                <Board
                  variant="player"
                  ocean={game.player.board.ocean}
                  step={step}
                  onPlaceShip={handlePlaceShipOnBoard}
                  onGuess={handleGuess}
                />
                {shipsPlaced ? (
                  <button onClick={(e) => readyToPlay(e)}>
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
          )) ||
          (step === EAppStep.Guessing && (
            <div className="grid">
              <h2>Guessing, {game.player.name}</h2>
              <div className="col col-8">
                <Board
                  variant="player"
                  ocean={game.player.board.ocean}
                  step={step}
                  onPlaceShip={handlePlaceShipOnBoard}
                  onGuess={handleGuess}
                />
                <Board
                  variant="opponent"
                  ocean={game.opponent.board.ocean}
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
