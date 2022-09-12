import { Game } from "../classes/Game";
import { EAppStep } from "../enums/AppStep";

export interface GameContextType {
  game: Game
  step: EAppStep
  playingPlayer: string,
  setPlayingPlayer(playingPlayer: string): void
  setStep(step: EAppStep): void
  haveAllPlayersInGame: boolean
  setHaveAllPlayersInGame(isFullRoom: boolean): void
}