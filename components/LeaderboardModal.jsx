import { getLeaderboard } from "@/app/utils/getAliens";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserStatsContext } from "@/contexts/UserStats";

export default function LeaderBoardModal() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [sort_by, setSort_by] = useState("score");
  const [timePeriod, setTimePeriod] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const { statsObject, setStatsObject } = useContext(UserStatsContext);

  useEffect(() => {
    getLeaderboard(sort_by, timePeriod, page).then((data) => {
      setTotalPages(Math.ceil(data.totalResults / 10));
      setUsers(data.users);
    });
  }, [sort_by, timePeriod, page]);

  function handlePlayAgain(e) {
    router.push("/singleplayerdisplay");
  }

  return (
    <div className="modal">
      <div className="leaderboard-text-box">
        <h1 className="leaderboard-title">Leaderboard</h1>
        <div className="leaderboard-buttons-container">
          <Link href="/">
            <button className="leaderboard-buttons">Home</button>
          </Link>
          <select
            className="leaderboard-buttons"
            onChange={(e) => {
              setSort_by(e.target.value);
            }}
          >
            <option value="score">Score</option>
            <option value="time">Time</option>
            <option value="created_at">Most Recent</option>
          </select>
          <select
            className="leaderboard-buttons"
            onChange={(e) => {
              if (e.target.value === "All Time") {
                setTimePeriod(null);
              } else {
                setTimePeriod(e.target.value);
              }
            }}
          >
            <option value={null}>All Time</option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
        </div>

        <div className="result-row">
          <h2>Ranking:</h2>
          <h2>Name:</h2>
          <h2>Time:</h2>
          <h2>Score:</h2>
        </div>
        {users.map((user) => {
          return (
            <div key={user._id} className="result-row">
              <div>{users.indexOf(user) + 1 + (page - 1) * 10}</div>
              <div>{user.username}</div>
              <div>
                {String(user.time.minutes).length < 2 && 0}
                {user.time.minutes}:{String(user.time.seconds).length < 2 && 0}
                {user.time.seconds}
              </div>
              <div>{user.score}</div>
            </div>
          );
        })}
        <div className="leaderboard-buttons-container">
          <button
            className="change-page-buttons"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            -
          </button>
          <p>page: {page}</p>
          <button
            className="change-page-buttons"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            +
          </button>
          {statsObject.score ? (
            <button
              className="leaderboard-buttons play-again"
              onClick={handlePlayAgain}
            >
              Play Again
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
