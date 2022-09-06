import React from 'react';
import { useLocation } from 'react-router-dom';
import { Player } from '../../domain/models/Player';
import BoardGame from '../components/BoardGame';

function BoardGamePage() {
  const location = useLocation();
  const player = location.state as Player;

  return (
    <main>
      <div style={{display: 'flex', gap:'20px'}}>
        <BoardGame variant="player" />
        <BoardGame variant="opponent" />
      </div>
    </main>
  );
}

export default BoardGamePage;
