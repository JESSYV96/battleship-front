
import React, {useContext} from 'react'
import { uuidv4 } from '@firebase/util';
import { generatePath, useNavigate } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import socket from '../../infra/services/socket.io/socket';
import { GameContext } from '../contexts/gameContext';


function HomePage() {
  const navigate = useNavigate();

  const { game } = useContext(GameContext);

  const createNewGame = () => {
    console.log('fetch', socket)
    const gameId: string = uuidv4()
    socket.on('connect', () => { })
    socket.emit('createGame', gameId, (player: IPlayer) => {
      console.log(player)
      game.player.name = player.name
      navigate(generatePath("/games/:gameId", { gameId }))
    });
  }

  return (
    <main>
      <h1>Battleship</h1>
      <button onClick={createNewGame}>Play</button>
    </main>
  );
}

export default HomePage;
