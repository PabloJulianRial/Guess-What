'use client';
import { createContext, useState } from 'react';

export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {
  const [yourSocket, setYourSocket] = useState('');

  return (
    <SocketContext.Provider value={{ yourSocket, setYourSocket }}>
      {children}
    </SocketContext.Provider>
  );
}
