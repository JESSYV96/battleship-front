import React, { useEffect, useState } from 'react'
import { generatePath, useNavigate } from 'react-router-dom';
import { Player } from '../../domain/models/Player';
import { socket } from '../../infra/services/socket';

function HomePage() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>({ name: '', roomId: '', role: '' })

  useEffect(() => {
    socket.on('connect', () => {
      console.log(socket.id);
    })
  }, [])

  

  const createNewGame = () => {
    socket.emit('createGame', (player: Player) => {
      setPlayer(player)
      navigate(generatePath("/games/:roomId", { roomId: player.roomId }))
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