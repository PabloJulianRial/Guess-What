"use client";
import { createContext, useState } from "react";

export const OpponentContext = createContext(null);

export default function OpponentProvider({ children }) {
  const [opponentObject, setOpponentObject] = useState({});

  return (
    <OpponentContext.Provider value={{ opponentObject, setOpponentObject }}>
      {children}
    </OpponentContext.Provider>
  );
}
