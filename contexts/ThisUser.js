"use client";
import { createContext, useState } from "react";

export const ThisUserContext = createContext(null);

export default function ThisUserProvider({ children }) {
  const [thisUser, setThisUser] = useState({ name: "", room: "" });

  return (
    <ThisUserContext.Provider value={{ thisUser, setThisUser }}>
      {children}
    </ThisUserContext.Provider>
  );
}
