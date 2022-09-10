import { Board } from '../../../../src/app/domain/classes/Board'
import { EShipType } from '../../../../src/app/domain/models/Ship'
import { Ship } from  '../../../../src/app/domain/classes/Ship'
import { Player } from '../../../../src/app/domain/classes/Player'
import { ERole } from '../../../../src/app/domain/models/Player'



it('should be return a points and status', () => {
    const board = new Board();
    expect(board.getPoint({x:1, y:1})).toEqual({"location": {"x": 1,"y": 1,},"status": "Empty"});
});

it('should raise an error for point out of the map', () => {
    const board = new Board();
    expect(() => {board.getPoint({x:100, y:100})}).toThrow(TypeError);
});

it('should be return a true  for ship placement', () => {
    const board = new Board();
    expect(board.checkShipPlacement(new Ship(EShipType.Destroyer),{x:1, y:1})).toEqual(true);
});

it('should raise an error for ship placement out of the map', () => {
    const board = new Board();
    expect(() => {board.checkShipPlacement(new Ship(EShipType.Destroyer),{x:100, y:100})}).toThrow(TypeError);
});

it('should be return true, the ship is not on the map', () => {
    const ship = new Ship(EShipType.Destroyer);
    expect(ship.isSunk()).toEqual(true);
});

it('should be return "Miss", there is not a ship on map', () => {
    const player = new Player("player 1", new Board(), ERole.Creator);
    expect(player.receiveGuess({x:1, y:1})).toEqual("Miss");
});


it('should be return the data of player 1 shot', () => {
    const player = new Player("player 1", new Board(), ERole.Creator);
    expect(player.makeGuess({x:1, y:1}, new Player("player 2", new Board(), ERole.Opponent))).toEqual({"guess": {"x": 1, "y": 1}, "id": 0, "playerName": "player 1", "result": "Miss"});
});
















