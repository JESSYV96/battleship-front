import { Manager, Socket } from "socket.io-client";

const manager = new Manager(process.env.REACT_APP_BASE_URL_API);

const socket: Socket = manager.socket('/');

export default socket
