import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { IPlayer } from '../../domain/models/Player';
import { GameContext } from '../contexts/gameContext';


import socket from '../../infra/services/socket.io/socket'

function JoinGame() {
    const params = useParams();
    const navigate = useNavigate();

    const { game } = useContext(GameContext);

    useEffect(() => {
        const joinGame = () => {
            return new Promise((resolve: (opponent: IPlayer) => void) => {
                socket.emit('joinGame', params.gameId, (opponent: IPlayer) => {
                    resolve(opponent)
                })
            }).then((opponent) => {
                game.player.name = opponent.name
                navigate(generatePath("/games/:gameId", { gameId: params.gameId }))
            })
        }

        joinGame()

    }, [navigate, params.gameId])

    return (
        <></>
    )
}

export default JoinGame