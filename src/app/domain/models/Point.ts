import type {Location} from './Location'

/**
 * Points
 */
export interface IPoint {
	location: Location
	status: EPointStatus
	updateStatus(status: EPointStatus): void
}


export enum EPointStatus {
  Hit = 'Hit',
  Miss = 'Miss',
  Ship = 'Ship',
  Empty = 'Empty',
  Sunk = 'Sunk',
}




