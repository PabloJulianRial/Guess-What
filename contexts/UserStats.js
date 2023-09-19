"use client"
import { createContext, useState } from "react"

export const UserStatsContext = createContext(null)

export default function UserStatsProvider({ children }) {
    const [statsObject, setStatsObject] = useState({
        username: "",
        minutes: 0,
        seconds: 0,
        score: 0,
        wins: 0,
        losses: 0
    })

    return (
        <UserStatsContext.Provider value={{ statsObject, setStatsObject }}>
            {children}
        </UserStatsContext.Provider>
    )
}