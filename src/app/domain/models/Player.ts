
import { IBoard } from "./Board";
import { ITurn } from "./Game";
import { PointStatus } from "./Point";
import { IBaseShip, IShip } from "./Ships";

export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, PointStatus>;
  role: '' | "opponent" | "creator"
  placeShip(ship: IBaseShip, location: Location): void;
  receiveGuess(location: Location): PointStatus;
  makeGuess(location: Location, opponent: IPlayer): ITurn;
}

