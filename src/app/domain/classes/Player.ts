import { Ship } from './Ship';
import { EShipType } from '../models/Ship';
import type { IBoard } from '../models/Board';
import type { IBaseShip, IShip } from '../models/Ship';
import type { IPlayer } from '../models/Player';
import type { IPoint } from '../models/Point';
import type { ITurn } from '../models/Turn';
import type { Location } from '../models/Location';
import { EPointStatus } from '../enums/PointStatus';
import { IRole } from '../models/Game';

export class Player implements IPlayer {
  public name: string;
  public board: IBoard;
  public fleet: IShip[] = [
    new Ship(EShipType.Destroyer),
    new Ship(EShipType.Submarine),
    new Ship(EShipType.Cruiser),
    new Ship(EShipType.Battleship),
    new Ship(EShipType.Carrier),
  ];
  public allShipsDestroyed: boolean = false;
  public guessedSpaces: Map<string, EPointStatus> = new Map();
  public role: IRole;
  public isReadyToPlay: boolean;

  constructor(name: string, board: IBoard, role: IRole) {
    this.name = name;
    this.board = board;
    this.role = role;
    this.isReadyToPlay = false;
  }

  // Checks if all player's ships are sunken
  public hasSunkenFleet = (): boolean => {
    for (let ship of this.fleet) {
      if (!ship.isSunk()) return false;
    }
    return true;
  };

  public placeShip(ship: IBaseShip, location: Location): void {
    try {
      // Check if location is occupied
      const square: IPoint = this.board.getPoint(location);

      if (
        square.status === EPointStatus.Hit ||
        square.status === EPointStatus.Miss
      )
        throw new Error(
          'Uh oh, this square is in a bad state. Please refresh.'
        );

      if (square.status === EPointStatus.Ship)
        throw new Error(
          `Uh oh, cannot place your ${ship.name} on top of another ship.`
        );

      // Check if ship is in player's fleet
      const playerShip = this.fleet.find((s) => s.type === ship.name);
      if (!playerShip)
        throw new Error(`Uh oh, ${ship.name} not found in player's fleet.`);

      // Update orientation for player's ship
      playerShip.orientation = ship.orientation;

      // Desired square empty, check if ship will fit there
      const canFit: boolean = this.board.checkShipPlacement(
        playerShip,
        location
      );

      if (canFit) {
        const { x, y } = location;
        if (playerShip.orientation === 'horizontal') {
          // walk horizontally
          for (let col = y; col < y + playerShip.size; col++) {
            const point = this.board.ocean[x][col];
            // Update players board that a ship occupies the space
            point.updateStatus(EPointStatus.Ship);
            // Add space to ship's occupied spaces
            playerShip.spacesOccupied.push(point);
          }
        } else {
          // walk vertically
          for (let row = x; row < x + playerShip.size; row++) {
            const point = this.board.ocean[row][y];
            // Update players board that a ship occupies the space
            point.updateStatus(EPointStatus.Ship);
            // Add space to ship's occupied spaces
            playerShip.spacesOccupied.push(point);
          }
        }
      }
    } catch (ex: any) {
      throw new Error(ex.message); // Pass error through
    }
  }

  public receiveGuess(location: Location): EPointStatus {
    // Point from board
    const point = this.board.getPoint(location);

    // Point has already been guessed
    if (
      point.status === EPointStatus.Sunk ||
      point.status === EPointStatus.Hit ||
      point.status === EPointStatus.Miss
    )
      throw new Error(
        `This point has already been guessed - [${location.x}, ${location.y}]`
      );

    // Point is miss:
    if (point.status === EPointStatus.Empty) {
      // update point on the board
      point.updateStatus(EPointStatus.Miss);
      return EPointStatus.Miss;
    }

    // Point is hit:
    if (point.status === EPointStatus.Ship) {
      // update point on the board
      point.updateStatus(EPointStatus.Hit);

      // update point on the ship
      // Alternatively, keep a list of occupied spaces and cycle through those for a match
      let hitShip: IShip | undefined;
      for (let ship of this.fleet) {
        if (hitShip) break;
        for (let pointOccupied of ship.spacesOccupied) {
          if (
            pointOccupied.location.x === location.x &&
            pointOccupied.location.y === location.y
          ) {
            pointOccupied.updateStatus(EPointStatus.Hit);
            hitShip = ship;
            break;
          }
        }
      }

      // Sink ship if all points have been hit
      const shipSunk = hitShip?.isSunk();
      if (hitShip && shipSunk) {
        hitShip.sink();
        console.info(`The ${hitShip.name} has been sunk!`);

        // Finally if all player's ships are sunk, end the game
        if (this.hasSunkenFleet()) {
          this.allShipsDestroyed = true;
        }
        return EPointStatus.Sunk;
      }
      return EPointStatus.Hit;
    }

    // Should never get called
    return EPointStatus.Empty;
  }

  public makeGuess(location: Location, opponent: IPlayer): ITurn {
    // Set up base turn
    let status: EPointStatus = EPointStatus.Empty;
    const turn: ITurn = {
      id: 0, // Increment later
      playerName: this.name,
      guess: location,
      result: status,
    };

    // Make guess and add it to cache
    turn.result = opponent.receiveGuess(location);
    this.guessedSpaces.set(`${location.x}${location.y}`, status);

    return turn;
  }
}

export default Player;
