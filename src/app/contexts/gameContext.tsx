
import React, { useState, useEffect } from 'react'
import { Game } from '../domain/classes/Game'
import { GameContextType } from '../domain/models/GameContext'


export const GameContext = React.createContext<GameContextType>({
  game: null
})

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    setGame(new Game())
  }, [])

  const ctxValue: GameContextType = {
    game
  }

  return <GameContext.Provider value={ctxValue}>{children}</GameContext.Provider>
}