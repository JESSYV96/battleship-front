import { Board } from '../../../../src/app/domain/classes/Board'
import { EShipType } from '../../../../src/app/domain/models/Ship'
import { EPointStatus } from '../../../../src/app/domain/enums/PointStatus'
import { Ship } from  '../../../../src/app/domain/classes/Ship'
import { Player } from '../../../../src/app/domain/classes/Player'
import { IPoint } from '../../../../src/app/domain/models/Point'


const playerData: IPoint[][] = [
    [
        {
            "location": {
                "x": 0,
                "y": 0,
            },
             "status": EPointStatus.Ship,
            "updateStatus":null
        },
        {
            "location": {
                "x": 0,
                "y": 1,
            },
             "status": EPointStatus.Ship,
              "updateStatus":null
        },
        {
            "location": {
                "x": 0,
                "y": 2,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        }
    ],
    [
        {
            "location": {
                "x": 1,
                "y": 0,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        },
        {
            "location": {
                "x": 1,
                "y": 1,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        },
        {
            "location": {
                "x": 1,
                "y": 2,
            },
             "status": EPointStatus.Ship,
              "updateStatus":null
        }
    ],
    [
        {
            "location": {
                "x": 2,
                "y": 0,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        },
        {
            "location": {
                "x": 2,
                "y": 2,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        },
        {
            "location": {
                "x": 2,
                "y": 2,
            },
             "status": EPointStatus.Empty,
              "updateStatus":null
        }
    ],

]
    

describe('Testing placement ship', function() {
    const board = new Board();
    board.ocean = playerData as IPoint[][];
    
    // Tests getPoint on Board
    it('should be return a points and status equal Ship', () => {
        expect(board.getPoint({x:0, y:0})).toEqual({"location": {"x": 0,"y": 0,},"status": "Ship", "updateStatus": null,});
    });

    it('should be return a points and status equal Empty', () => {
        expect(board.getPoint({x:0, y:2})).toEqual({"location": {"x": 0,"y": 2,},"status": "Empty", "updateStatus": null,});
    });

    it('should raise an error for point out of the map', () => {
        expect(() => {board.getPoint({x:3, y:3})}).toThrow(TypeError);
    });

     // Tests checkShipPlacement on Board
    it('should be return a true for empty placement', () => {
        expect(board.checkShipPlacement(new Ship(EShipType.Destroyer),{x:2, y:1})).toEqual(true);
    });

    it('should be return a true for empty placement', () => {
        expect(() => {board.checkShipPlacement(new Ship(EShipType.Destroyer),{x:0, y:0})}).toThrow(`Uh oh, cannot place the Destroyer on top of another ship.`);
    });

    it('should raise an error for ship placement out of the map', () => {
        expect(() => {board.checkShipPlacement(new Ship(EShipType.Destroyer),{x:3, y:3})}).toThrow(TypeError);
    });
})


describe('Testing placement ship', function() {
    const player = new Player("player 1", new Board(), "player");

    // Tests Ship is sunk
    it('should be return true, the ship is not on the map', () => {
        const ship = new Ship(EShipType.Destroyer);
        expect(ship.isSunk()).toEqual(true);
    });

    it('should be return "Miss", there is not a ship on map', () => {
        expect(player.receiveGuess({x:1, y:1})).toEqual("Miss");
    });

    it('should be return the data of player 1 shot', () => {
        expect(player.makeGuess({x:1, y:1}, new Player("player 2", new Board(), "opponent"))).toEqual({"guess": {"x": 1, "y": 1}, "id": 0, "playerName": "player 1", "result": "Miss"});
    });
})



