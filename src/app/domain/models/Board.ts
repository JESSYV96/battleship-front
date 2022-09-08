import { Location } from "./Location";
import { IPoint } from "./Point";
import { IShip } from "./Ship";


/**
 * Board
 */
export interface IBoard {
  ocean: IPoint[][];
  clearBoard(): void;
  getPoint(location: Location): IPoint;
  checkShipPlacement(ship: IShip, startLocation: Location): boolean;
}
