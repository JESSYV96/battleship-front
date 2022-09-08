import { EPointStatus } from '../enums/PointStatus';
import { Coordinate } from '../valueObjects/Coordinate';
import { IBoard } from './Board';
import { IPlayer } from './Player';

/**
 * Game
 */
export interface ITurn {
  id: number;
  playerName: string;
  guess: Coordinate;
  result: EPointStatus;
}

export interface IGame {
  playerBoard: IBoard;
  opponentBoard: IBoard;
  player: IPlayer;
  opponent: IPlayer;
  turns: ITurn[];
  winner: IPlayer | null;
  play(): void;
  addTurn(turn: ITurn): ITurn[];
  declareWinner(player: IPlayer): void;
}
