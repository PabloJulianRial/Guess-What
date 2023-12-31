'use client';

import Link from 'next/link';
import { UsersContext } from '@/contexts/User';
import { UserStatsContext } from '../contexts/UserStats';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThisUserContext } from '@/contexts/ThisUser';
import { getAliens } from '@/app/utils/getAliens';
import { SocketContext } from '@/contexts/Socket';

export const LandingCard = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { yourSocket, setYourSocket } = useContext(SocketContext);
  const { statsObject, setStatsObject } = useContext(UserStatsContext);
  const { thisUser, setThisUser } = useContext(ThisUserContext);
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('thisUser', JSON.stringify(thisUser))
  }, [thisUser, users, yourSocket]
  )

  useEffect(() => {
    if (users.allAliens.length) {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }, [users])

  useEffect(() => {
    localStorage.setItem('statsObject', JSON.stringify(statsObject))
  }, [statsObject])

  useEffect(() => {
    getAliens().then((res) => {
      let obj = { ...users };
      obj.allAliens = res;
      setUsers(obj);
    });
  }, []);

  function handleSinglePlayerClick(e) {
    e.preventDefault();
    setClicked(true);
    router.push('/singleplayerdisplay');
  }

  function handleTwoPlayerClick(e) {
    e.preventDefault();
    setClicked(true);

    router.push('/twoplayerdisplay');
  }

  return (
    <div className="landing-text-box">
      <h2>Welcome!!!!!!!</h2>

      <p>
        Ask yes or no questions to find out which randomly generated alien your
        opponent has chosen
      </p>

      <form className="sign-in-form" id="sign-in">
        <div className="input-boxes">
          <p>Please enter your name</p>
          <div className="flex flex-col">
            <label htmlFor="username"> </label>
            <input
              className="name-input"
              type="text"
              id="username"
              value={thisUser.name}
              onChange={(e) => {
                let obj = { ...thisUser };
                obj.name = e.target.value;
                setThisUser(obj);
                const currentUserStats = { ...statsObject };
                currentUserStats.username = e.target.value;
                setStatsObject(currentUserStats);
              }}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            className="lcbtn"
            id="singleplayer-btn"
            disabled={clicked || thisUser.name === ''}
            onClick={(e) => {
              handleSinglePlayerClick(e);
            }}
          >
            1 player
          </button>
          <button
            className="lcbtn"
            id="multiplayer-btn"
            disabled={clicked || thisUser.name === ''}
            onClick={(e) => {
              handleTwoPlayerClick(e);
            }}
          >
            2 player
          </button>
        </div>
        <div className="leaderboard-container">
          <button className="lcbtn" id="leaderboard-btn">
            <Link href="/leaderboarddisplay">View Leaderboard</Link>
          </button>
        </div>
      </form>
    </div>
  );
};
