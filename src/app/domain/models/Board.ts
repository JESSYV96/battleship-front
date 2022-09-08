import { Coordinate } from "../valueObjects/Coordinate";
import { IPoint } from "./Point";
import { IShip } from "./Ships";


export interface IBoard {
  ocean: IPoint[][];
  clearBoard(): void;
  getPoint(location: Coordinate): IPoint;
  checkShipPlacement(ship: IShip, startLocation: Coordinate): boolean;
}
