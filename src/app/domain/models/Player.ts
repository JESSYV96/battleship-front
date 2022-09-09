
import { EPointStatus } from "../enums/PointStatus";
import { Coordinate } from "../valueObjects/Coordinate";
import { IBoard } from "./Board";
import { ITurn } from "./Turn";
import { IBaseShip, IShip } from "./Ship";
import { IRole } from "./Game";

export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, EPointStatus>;
  role: IRole
  isReadyToPlay: boolean;
  placeShip(ship: IBaseShip, location: Coordinate): void;
  receiveGuess(location: Coordinate): EPointStatus;
  makeGuess(location: Coordinate, opponent: IPlayer): ITurn;
}

