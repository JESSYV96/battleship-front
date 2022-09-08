import { IPoint } from '../models/Point'
import { EShipOrientation, EShipType, IShip } from '../models/Ship'
import { EPointStatus } from '../enums/PointStatus'

export class Ship implements IShip {
	public type: EShipType
	public name: string
	public orientation: EShipOrientation = EShipOrientation.Horizontal
	public spacesOccupied: IPoint[] = []
	public size: number

	constructor(type: EShipType) {
		this.type = type

		switch (type) {
			case EShipType.Destroyer:
				this.size = 2
				this.name = 'Destroyer'
				break
			case EShipType.Submarine:
				this.size = 3
				this.name = 'Submarine'
				break
			case EShipType.Cruiser:
				this.size = 3
				this.name = 'Cruiser'
				break
			case EShipType.Battleship:
				this.size = 4
				this.name = 'Battleship'
				break
			case EShipType.Carrier:
				this.size = 5
				this.name = 'Carrier'
				break
			default:
				throw new Error(`Ship type ${type} not recognized!`)
		}
	}

	// Checks if a ship's spaces
	public isSunk(): boolean {
		let sunk = true
		for (let { status } of this.spacesOccupied) {
			if (status !== EPointStatus.Hit && status !== EPointStatus.Sunk) {
				sunk = false
				break
			}
		}
		return sunk
	}

	// Update all ship's spaces to sunk
	public sink(): void {
		this.spacesOccupied.forEach(point => point.updateStatus(EPointStatus.Sunk))
	}
}
