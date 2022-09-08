import { IPoint } from "./Point";
import { IShip } from "./Ships";


/**
 * Board
 */
export interface IBoard {
  ocean: IPoint[][];
  clearBoard(): void;
  getPoint(location: Location): IPoint;
  checkShipPlacement(ship: IShip, startLocation: Location): boolean;
}
