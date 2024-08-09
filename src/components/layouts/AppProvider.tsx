"use client"
import { createContext, useContext, useState } from "react";

type Props = {
  children: React.ReactNode
}

const AppContext = createContext<{
  userPoints: number
  setUserPoints: React.Dispatch<React.SetStateAction<number>>
  status: string
  setStatus: React.Dispatch<React.SetStateAction<string>>
}>({
  userPoints: 0,
  setUserPoints: () => { },
  status: '',
  setStatus: () => { }
});

export const useAppProvider = () => useContext(AppContext)

export default function AppProvider({
  children
}: Props) {
  const [userPoints, setUserPoints] = useState<number>(0)
  const [status, setStatus] = useState<string>('')
  return (
    <AppContext.Provider value={{
      userPoints,
      setUserPoints,
      status,
      setStatus
    }}>
      {children}
    </AppContext.Provider>
  )
}
