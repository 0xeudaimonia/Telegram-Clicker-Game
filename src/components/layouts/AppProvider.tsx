"use client"
import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode
}

const AppContext = createContext<{
  userPoints: number
  setUserPoints: React.Dispatch<React.SetStateAction<number>>
  currentUserId: string
  setCurrentUserId: React.Dispatch<React.SetStateAction<string>>
}>({
  userPoints: 0,
  setUserPoints: () => { },
  currentUserId: '',
  setCurrentUserId: () => { }
});

export const useAppProvider = () => useContext(AppContext)

export default function AppProvider({
  children
}: Props) {
  const [userPoints, setUserPoints] = useState<number>(0)
  const [currentUserId, setCurrentUserId] = useState<string>('')
  return (
    <AppContext.Provider value={{
      userPoints,
      setUserPoints,
      currentUserId,
      setCurrentUserId
    }}>
      {children}
    </AppContext.Provider>
  )
}
