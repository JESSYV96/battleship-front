import React, { useEffect } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { Player } from '../../domain/models/Player';
import { socket } from '../../infra/services/socket';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    })
  }, [])

  const createNewGame = () => {
    socket.emit('createGame', (player: Player) => {
      navigate(generatePath("/games/:roomId", { roomId: player.roomId }), { state: player })
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