"use client"
import { createContext, useState } from "react"

export const TurnContext = createContext(0)

export default function TurnProvider({ children }) {
    const [turn, setTurn] = useState(0)
    console.log(turn)
    return (
        <TurnContext.Provider value={{ turn, setTurn }}>
            {children}
        </TurnContext.Provider>
    )
}