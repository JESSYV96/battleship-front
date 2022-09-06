import { Manager } from "socket.io-client";

const manager = new Manager(process.env.REACT_APP_BASE_URL);

export const socket = manager.socket("/");
