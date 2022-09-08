import { EPointStatus } from '../enums/PointStatus';
import { Coordinate } from '../valueObjects/Coordinate';
import { IBoard } from './Board';
import { IPlayer } from './Player';
import { ITurn } from './Turn';

export type IRole = "opponent" | "player"

export enum EAppStep {
  Intro,
  Placing,
  Guessing,
  Ending,
  HighScores,
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
