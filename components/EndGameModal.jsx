'use client';
import { UserStatsContext } from '@/contexts/UserStats';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { OpponentContext } from '@/contexts/OpponentObject';
import { UsersContext } from '@/contexts/User';

export default function EndGameModal({
  chosenAlien,
  setIsGameFinished,
  setHasWon,
  hasWon,
  setIsLoading
}) {
  const { opponentObject, setOpponentObject } = useContext(OpponentContext);
  const [clicked, setClicked] = useState(false);
  const { statsObject, setStatsObject } = useContext(UserStatsContext);
  const { users, setUsers } = useContext(UsersContext);



  const winnerAlien = chosenAlien;

  const router = useRouter();

  function handlePlayAgain(e) {
    e.preventDefault();
    setIsLoading(true);
    setIsGameFinished(false);
    setClicked(true);
    setHasWon(null);
    const currentStats = { ...statsObject };
    currentStats.score = 0;
    setStatsObject(currentStats);
    setOpponentObject({});
  }

  function handleHome(e) {
    e.preventDefault();
    setClicked(true);
    router.push('/');
  }

  function handleLeaderboard(e) {
    router.push('/leaderboarddisplay');
  }

  return (
    <div className="modal">
      <div className="text-box">
        <h1>You {hasWon ? "Win" : "Lose"}!</h1>
        <div className="aliencard winner-card">
          <img
            className="alien-planet"
            src={`assets/alien-layers/planet-${winnerAlien.planet}.png`}
          />
          <img
            className="alien-body"
            src={`assets/alien-layers/body-${winnerAlien.skinColour}-${winnerAlien.skinTexture}.png`}
          />
          <img
            className="alien-eyes"
            src={`assets/alien-layers/eyes-${winnerAlien.eyeColour}-${winnerAlien.eyes}.png`}
          />
          <img
            className="alien-mouth"
            src={`assets/alien-layers/mouth-${
              winnerAlien.isFriendly ? 'friendly' : 'unfriendly-a'
            }.png`}
          />
          {winnerAlien.horns ? (
            <img
              className="alien-horns"
              src={`assets/alien-layers/horns-${winnerAlien.horns}.png`}
            />
          ) : null}
          {winnerAlien.hasAntenna ? (
            <img
              className="alien-antenna"
              src={'assets/alien-layers/antenna.png'}
            />
          ) : null}
        </div>
        <div className="stats-container">
          <div id="stats-container">
          {hasWon ? <p>Congratulations {statsObject.username}, you win!</p> : <p>Sorry, {statsObject.username}, you lose!</p>}
            <p>Score {statsObject.score}</p>
            <p>
              Time {String(statsObject.minutes).length < 2 && 0}
              {statsObject.minutes}:
              {String(statsObject.seconds).length < 2 && 0}
              {statsObject.seconds}
            </p>
          </div>
        </div>
        <div className="end-modal-btns">
          <div className="play-home">
            <button
              className="question-submit-btn"
              onClick={(e) => {
                handlePlayAgain(e);
              }}
            >
              Play again
            </button>

            <button
              className="question-submit-btn"
              onClick={(e) => {
                handleHome(e);
              }}
            >
              Home
            </button>
          </div>
          <button
            className="question-submit-btn extended"
            onClick={handleLeaderboard}
          >
            Show Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
