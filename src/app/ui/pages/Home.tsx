import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IPlayer } from '../../domain/models/Player';

function HomePage() {
  const navigate = useNavigate();
  // const [player, setPlayer] = useState<IPlayer>({ name: '' })

  return (
    <main>
      <h1>Battleship</h1>
      {/* <input type="text" onChange={(e) => setPlayer({ name: e.target.value })} /> */}
      <button onClick={() => navigate('/game')}>Play</button>
    </main>
  );
}

export default HomePage;
