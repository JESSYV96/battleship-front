
import { EPointStatus } from "../enums/PointStatus";
import { Coordinate } from "../valueObjects/Coordinate";
import { IBoard } from "./Board";
import { IRole } from "./Game";
import { ITurn } from "./Turn";
import { IBaseShip, IShip } from "./Ship";

export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, EPointStatus>;
  role: IRole
  placeShip(ship: IBaseShip, location: Coordinate): void;
  receiveGuess(location: Coordinate): EPointStatus;
  makeGuess(location: Coordinate, opponent: IPlayer): ITurn;
}

