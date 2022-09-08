import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { IPlayer } from '../../domain/models/Player';

import socket from '../../infra/services/socket'

function WaitingForJoin() {
    const [player, setPlayer] = useState<IPlayer>()
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        socket.on('connect', () => { })
        socket.emit('joinGame', params.gameId, (opponent: IPlayer) => {
            setPlayer(opponent)
        })
        if (player) {
            navigate(generatePath("/games/:gameId", { gameId: params.gameId }), { state: player })
        }

    }, [socket, navigate, player, params.gameId])



    return (
        <></>
    )
}

export default WaitingForJoin