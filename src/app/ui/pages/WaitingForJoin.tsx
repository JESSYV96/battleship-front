import React, { useEffect } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";

import { socket } from '../../infra/services/socket'

function WaitingForJoin() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
        })
        socket.emit('joinGame', params.roomId)
        navigate(generatePath("/games/:roomId", { roomId: params.roomId }))
    }, [navigate, params.roomId])
    return (
        <></>
    )
}

export default WaitingForJoin