import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { IPlayer } from '../../domain/models/Player';

import socket from '../../infra/services/socket.io/socket'

function JoinGame() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const joinGame = () => {
            return new Promise((resolve: (opponent: IPlayer) => void) => {
                socket.emit('joinGame', params.gameId, (opponent: IPlayer) => {
                    resolve(opponent)
                })
            }).then((opponent) => {
                navigate(generatePath("/games/:gameId", { gameId: params.gameId }), { state: opponent })
            })
        }

        joinGame()

    }, [navigate, params.gameId])

    return (
        <></>
    )
}

export default JoinGame