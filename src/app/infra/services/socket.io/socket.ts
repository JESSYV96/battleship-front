import { Manager, Socket } from "socket.io-client";

const manager = new Manager(process.env.REACT_APP_BASE_URL_API, {
    transports: ["websocket", "polling"]
});

const socket: Socket = manager.socket('/');

export const registerToGameSetUpHandlers = (socket: Socket) => {
    const playerReadyToPlay = (callback: (playerName: string, isOpponentReady: boolean) => void): void => {
        socket.on('isPlayerReadyToPlayToClient', callback);
    }

    const gameReadyToStart = (callback: (isGameReady: boolean) => void): void => {
        socket.on('isGameReadyToStart', callback);
    }

    const gameStart = (callback: (isFullRoom: boolean) => void): void => {
        socket.on('startGame', callback)
    }

    return {
        playerReadyToPlay,
        gameReadyToStart,
        gameStart
    }
}

export default socket
