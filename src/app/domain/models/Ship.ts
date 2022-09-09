import { IPoint } from './Point';

export enum EShipType {
  Destroyer = 'Destroyer',
  Submarine = 'Submarine',
  Cruiser = 'Cruiser',
  Battleship = 'Battleship',
  Carrier = 'Carrier',
}

export type ShipOrientation = 'horizontal' | 'vertical';

export interface IBaseShip {
  name: string;
  orientation: ShipOrientation;
}

export interface IShip extends IBaseShip {
  type: EShipType;
  spacesOccupied: IPoint[];
  size: number;
  isSunk(): boolean;
  sink(): void;
}

export type ShipData = {
  name: string;
  size: number;
  orientation: 'horizontal' | 'vertical';
};
