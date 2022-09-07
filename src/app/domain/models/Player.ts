import { IBoard } from "./Board";
import { ITurn } from "./Game";
import { PointStatus } from "./Point";
import { IBaseShip, IShip } from "./Ships";

/**
 * Players
 */
export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, PointStatus>;
  placeShip(ship: IBaseShip, location: Location): void;
  receiveGuess(location: Location): PointStatus;
  makeGuess(location: Location, opponent: IPlayer): ITurn;
}
