
import { IBoard } from "./Board";
import { ITurn } from "./Turn";
import { EPointStatus } from "./Point";
import { Location } from "./Location";
import { IBaseShip, IShip } from "./Ship";

export enum ERole {
  Opponent = "opponent",
  Creator = "creator"
}
export interface IPlayer {
  name: string;
  board: IBoard;
  fleet: IShip[];
  allShipsDestroyed: boolean;
  guessedSpaces: Map<string, EPointStatus>;
  role: ERole
  placeShip(ship: IBaseShip, location: Location): void;
  receiveGuess(location: Location): EPointStatus;
  makeGuess(location: Location, opponent: IPlayer): ITurn;
}

