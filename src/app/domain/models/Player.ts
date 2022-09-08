
import { EPointStatus } from "../enums/PointStatus";
import { Coordinate } from "../valueObjects/Coordinate";
import { IBoard } from "./Board";
import { ITurn } from "./Game";
import { IBaseShip, IShip } from "./Ships";

export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, EPointStatus>;
  role: '' | "opponent" | "creator"
  placeShip(ship: IBaseShip, location: Coordinate): void;
  receiveGuess(location: Coordinate): EPointStatus;
  makeGuess(location: Coordinate, opponent: IPlayer): ITurn;
}

