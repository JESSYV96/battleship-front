import { IPoint, EPointStatus } from '../models/Point'
import { Location } from '../models/Location'

class Point implements IPoint {
	public location: Location
	public status: EPointStatus

	constructor(x: number, y: number) {
		this.location = { x, y }
		this.status = EPointStatus.Empty
	}

	public updateStatus(status: EPointStatus): void {
		this.status = status
	}
}

export default Point