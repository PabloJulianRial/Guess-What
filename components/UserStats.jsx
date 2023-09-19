"use client";

import { Score } from "./Score";
import Timer from "./Timer";

export default function UserStats({ alienObjects, isGameFinished, isLoading }) {
  let activeAlienCounter = alienObjects.filter((alien) => {
    return alien.isActive === true;
  });
  return (
    <div className="user-stats">
      <Timer isGameFinished={isGameFinished} isLoading={isLoading} />
      <div className="alien-stats">
        <Score isGameFinished={isGameFinished} />
        <div className="aliens-left">
          <h1>Aliens left: {activeAlienCounter.length} </h1>
        </div>
      </div>
    </div>
  );
}
