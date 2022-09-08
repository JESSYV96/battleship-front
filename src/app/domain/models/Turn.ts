import { Location } from './Location'
import { EPointStatus } from '../enums/PointStatus'

export interface ITurn {
	id: number
	playerName: string
	guess: Location
	result: EPointStatus
}