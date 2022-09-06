import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Player } from '../../domain/models/Player';
import { socket } from '../../infra/services/socket';

function HomePage() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player>({ username: '' })

  socket.on('connect', () => {
    console.log(socket.id);
  })

  return (
    <main>
      <h1>Battleship</h1>
      <input type="text" onChange={(e) => setPlayer({ username: e.target.value })} />
      <button onClick={() => navigate('/game', { state: player})}>Play</button>
    </main>
  )
}

export default HomePage