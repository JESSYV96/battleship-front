import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from "react-router-dom";
import { Player } from '../../domain/models/Player';

import { socket } from '../../infra/services/socket'

function BoardGamePage() {
    const params = useParams();
    const location = useLocation();
    const [isFullRoom, setIsFullRoom] = useState<boolean>(false)
    const player = location.state as Player


    useEffect(() => {
        socket.on('startGame', (isFullRoom: boolean) => {
            setIsFullRoom(isFullRoom);
        })
    }, [isFullRoom])

    const joinGameUrl = new URL(`${process.env.REACT_APP_BASE_URL_APP}games/${params.roomId}/join`)

    return (
        <main>
            {isFullRoom
                ? <h1>Bienvenue {player.name}, "BoardGame"</h1>
                : <h1>En attente de l'adversaire  {joinGameUrl.href}</h1>
            }
        </main>
    )
}

export default BoardGamePage