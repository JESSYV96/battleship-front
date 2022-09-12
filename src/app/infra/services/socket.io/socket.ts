import { Manager, Socket } from "socket.io-client";
import { IBoard } from "../../../domain/models/Board";
import { IPlayer } from "../../../domain/models/Player";

const manager = new Manager(process.env.REACT_APP_BASE_URL_API, {
    transports: ["websocket", "polling"]
});

const socket: Socket = manager.socket('/');

export const registerToGameSetUpHandlers = (socket: Socket) => {
    const playerReadyToPlay = (callback: (playerName: string, isOpponentReady: boolean, board: IBoard) => void): void => {
        socket.on('isPlayerReadyToPlayToClient', callback);
    }

    const gameReadyToStart = (callback: (isGameReady: boolean) => void): void => {
        socket.on('isGameReadyToStart', callback);
    }

    const gameStart = (callback: (isFullRoom: boolean) => void): void => {
        socket.on('startGame', callback)
    }

    const opponentHasPlayed = (cb: (playerNewBoard: IBoard, attackingPlayer: IPlayer) => void): void => {
        socket.on('boardUpdated', cb);
    }

    return {
        playerReadyToPlay,
        gameReadyToStart,
        gameStart,
        opponentHasPlayed
    }
}

export default socket
