import { IPoint } from './Point';

/**
 * Ships
 */
 export enum EShipType {
	Destroyer = 'Destroyer',
	Submarine = 'Submarine',
	Cruiser = 'Cruiser',
	Battleship = 'Battleship',
	Carrier = 'Carrier',
}

export enum EShipOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export interface IBaseShip {
  name: string;
  orientation: EShipOrientation;
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
  orientation: EShipOrientation;
};
