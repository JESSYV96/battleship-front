import { Location } from './Location'
import { EPointStatus } from './Point'

export interface ITurn {
	id: number
	playerName: string
	guess: Location
	result: EPointStatus
}