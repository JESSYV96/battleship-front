import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { Player } from '../../domain/models/Player';

import socket from '../../infra/services/socket'

function WaitingForJoin() {
    const [player, setPlayer] = useState<Player>()
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        socket.on('connect', () => { })
        socket.emit('joinGame', params.gameId, (opponent: Player) => {
            setPlayer(opponent)
        })
        if (player) {
            navigate(generatePath("/games/:gameId", { gameId: params.gameId }), { state: player })
        }

    }, [socket, navigate, player])



    return (
        <></>
    )
}

export default WaitingForJoin