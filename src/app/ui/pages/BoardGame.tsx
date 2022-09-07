import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Player } from '../../domain/models/Player';

import { socket } from '../../infra/services/socket'

function BoardGamePage() {
    const params = useParams();
    const [isFullRoom, setIsFullRoom] = useState<boolean>(false)

    useEffect(() => {
        console.log("beforeStartGame");
        socket.on('startGame', (isFullRoom: boolean) => {
            setIsFullRoom(isFullRoom);
        })
    }, [isFullRoom])

    
    const joinGameUrl = new URL(`${process.env.REACT_APP_BASE_URL_APP}games/${params.roomId}/join`)

    return (
        <main>
            {isFullRoom
                ? <h1>Bienvenue, "BoardGame"</h1>
                : <h1>En attente de l'adversaire  {joinGameUrl.href}</h1>
            }
        </main>
    )
}

export default BoardGamePage