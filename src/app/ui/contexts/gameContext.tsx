
import React, { useState, useEffect } from 'react'
import { Game } from '../../domain/classes/Game'
import { EAppStep } from '../../domain/enums/AppStep'
import { GameContextType } from '../../domain/models/GameContext'


export const GameContext = React.createContext<GameContextType>({
  game: null,
  step: EAppStep.Placing,
  setStep: () => {},
  haveAllPlayersInGame: false,
  setHaveAllPlayersInGame: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null)
  const [step, setStep] = useState<EAppStep>(EAppStep.Placing);
  const [haveAllPlayersInGame, setHaveAllPlayersInGame] = useState<boolean>(false);

  useEffect(() => {
    setGame(new Game())
  }, [])

  const ctxValue: GameContextType = {
    game,
    step,
    setStep,
    haveAllPlayersInGame,
    setHaveAllPlayersInGame
  }

  return <GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>
}