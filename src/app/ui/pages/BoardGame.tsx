import React from 'react'
import { useLocation } from "react-router-dom";
import { Player } from '../../domain/models/Player';


function BoardGamePage() {
    const location = useLocation()
    const player = location.state as Player;

    return (
        <main>
            <h1>Bonjour, {player.username}</h1>
        </main>
    )
}

export default BoardGamePage