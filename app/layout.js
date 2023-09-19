import "./globals.css";
import { Inter } from "next/font/google";

import OpponentProvider from "@/contexts/OpponentObject";
import UserStatsProvider from "@/contexts/UserStats";
import SocketProvider from "@/contexts/Socket";
import UsersProvider from "@/contexts/User";
import ThisUserProvider from "@/contexts/ThisUser";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guess What?!",
  description: "A game built in one week by team Git Kermit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <body className={inter.className}>
        <UsersProvider>
          <SocketProvider>
            <OpponentProvider>
              <ThisUserProvider>
                <UserStatsProvider>{children}</UserStatsProvider>
              </ThisUserProvider>
            </OpponentProvider>
          </SocketProvider>
        </UsersProvider>
      </body>
    </html>
  );
} 
