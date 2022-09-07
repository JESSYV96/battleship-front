import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { Player } from '../../domain/models/Player';

import { socket } from '../../infra/services/socket'

function WaitingForJoin() {
    const params = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState<Player>({ name: '', roomId: '', role: '' })


    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
        })
        socket.emit('joinGame', params.roomId, (player: Player) => {
            setPlayer(player);
        })
        navigate(generatePath("/games/:roomId", { roomId: params.roomId }), {state: player})
    }, [navigate, params.roomId, player])
    return (
        <></>
    )
}

export default WaitingForJoin