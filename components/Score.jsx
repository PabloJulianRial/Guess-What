import { useContext, useEffect } from "react";
import { UserStatsContext } from "@/contexts/UserStats";

export const Score = ({ isGameFinished }) => {
  const { statsObject, setStatsObject } = useContext(UserStatsContext);

  useEffect(() => {
    if (!isGameFinished) {
      const currentStats = { ...statsObject };
      currentStats.score = 0;
      setStatsObject(currentStats);
    }
  }, [isGameFinished]);

  return (
    <div className="score">
      <p>Score: {statsObject.score}</p>
    </div>
  );
};
