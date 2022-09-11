import { Game } from "../classes/Game";
import { EAppStep } from "../enums/AppStep";

export interface GameContextType {
  game: Game | null
  step: EAppStep
  setStep(step: EAppStep): void
  haveAllPlayersInGame: boolean
  setHaveAllPlayersInGame(isFullRoom: boolean): void
}