
import React, { useState, useEffect } from 'react'
import { Game } from '../../domain/classes/Game'
import { EAppStep } from '../../domain/enums/AppStep'
import { GameContextType } from '../../domain/models/GameContext'


export const GameContext = React.createContext<GameContextType>({
  game: new Game(),
  step: EAppStep.Placing,
  setStep: () => {},
  playingPlayer: 'Player 1',
  setPlayingPlayer: () => {},
  haveAllPlayersInGame: false,
  setHaveAllPlayersInGame: () => {}
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [game] = useState<Game>(new Game())
  const [step, setStep] = useState<EAppStep>(EAppStep.Placing);
  const [haveAllPlayersInGame, setHaveAllPlayersInGame] = useState<boolean>(false);
  const [playingPlayer, setPlayingPlayer] = useState<string>('Player 1');



  const ctxValue: GameContextType = {
    game,
    step,
    setStep,
    playingPlayer,
    setPlayingPlayer,
    haveAllPlayersInGame,
    setHaveAllPlayersInGame
  }

  return <GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>
}