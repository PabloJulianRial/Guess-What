"use client";

import EndGameModal from "@/components/EndGameModal";
import { Footer } from "@/components/Footer";
import Gameboard from "@/components/Gameboard";
import { Header } from "@/components/Header";
import OpponentCard from "@/components/OpponentCard";
import QuestionCard from "@/components/QuestionCard";
import UserStats from "@/components/UserStats";
import { useState, useEffect } from "react";
import { getAliens } from "../utils/getAliens";
import chooseSecretAlien from "../utils/chooseSecretAlien";

export default function SinglePlayerDisplay() {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alienObjects, setAlienObjects] = useState([]);
  const [chosenAlien, setChosenAlien] = useState();
  const [hasWon, setHasWon] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTurn, setCurrentTurn] = useState(0)

  useEffect(() => {
    if (!isGameFinished) {
      getAliens().then((res) => {
        setAlienObjects(res);
        setIsLoading(false);
        setChosenAlien(chooseSecretAlien(res));
      });
    }
  }, [isGameFinished]);

  return (
    <main>
      <Header />
      <div className="game-wrapper">
        {isGameFinished && (
          <EndGameModal
            chosenAlien={chosenAlien}
            setIsGameFinished={setIsGameFinished}
            setHasWon={setHasWon}
            hasWon={hasWon}
            setIsLoading={setIsLoading}
          />
        )}
        <Gameboard
          isLoading={isLoading}
          alienObjects={alienObjects}
          setAlienObjects={setAlienObjects}
        />
        <QuestionCard
          alienObjects={alienObjects}
          setAlienObjects={setAlienObjects}
          isGameFinished={isGameFinished}
          setIsGameFinished={setIsGameFinished}
          chosenAlien={chosenAlien}
          hasWon={hasWon}
          setHasWon={setHasWon}
          currentTurn={currentTurn}
          setCurrentTurn={setCurrentTurn}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <OpponentCard />
        <UserStats alienObjects={alienObjects} isGameFinished={isGameFinished} isLoading={isLoading} />
      </div>
      <Footer />
    </main>
  );
}
