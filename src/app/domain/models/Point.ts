import { EPointStatus } from "../enums/PointStatus"
import { Coordinate } from "../valueObjects/Coordinate"
export interface IPoint {
	location: Coordinate
	status: EPointStatus
	updateStatus(status: EPointStatus): void
}
