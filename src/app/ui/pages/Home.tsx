
import React, { useEffect } from 'react'
import { uuidv4 } from '@firebase/util';
import { generatePath, useNavigate } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';
import socket from '../../infra/services/socket';


function HomePage() {
  const navigate = useNavigate();
  

  const createNewGame = () => {
    const gameId: string = uuidv4()
    socket.on('connect', () => {})
    socket.emit('createGame', gameId, (player: IPlayer) => {
      navigate(generatePath("/games/:gameId", { gameId }), { state: player })
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
