'use client';
import { createContext, useState } from 'react';

export const UsersContext = createContext(null);

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState({
    p1: { p1name: '', p1socketId: '', p1alien: {} },
    p2: { p2name: '', p2socketId: '', p2alien: {} },
    allAliens: [],
  });

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
}
