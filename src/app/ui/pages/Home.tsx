import { uuidv4 } from '@firebase/util';
import React, { useEffect } from 'react'

import { generatePath, useNavigate } from 'react-router-dom';
import { Player } from '../../domain/models/Player';
import socket from '../../infra/services/socket';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    })
  }, [])

  const createNewGame = () => {
    const gameId: string = uuidv4()
    socket.emit('createGame', gameId, (player: Player) => {
      navigate(generatePath("/games/:gameId", { gameId }), { state: player })
    });
  }

  return (
    <main>
      <h1>Battleship</h1>
      <button onClick={() => createNewGame()}>Play</button>
    </main>
  )
}

export default HomePage