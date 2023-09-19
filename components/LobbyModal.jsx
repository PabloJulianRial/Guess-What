'use client';

import { getAliens } from '@/app/utils/getAliens';
import { SocketContext } from '@/contexts/Socket';
import { ThisUserContext } from '@/contexts/ThisUser';
import { UsersContext } from '@/contexts/User';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
const { io } = require('socket.io-client');

const socket = io('https://guess-what-copy.onrender.com/');

export default function LobbyModal({
  setIsLoading,
  alienObjects,
  setAlienObjects,
  chosenAlien,
  setChosenAlien,
  chooseSecretAlien,
  setDisplayLobby,
  isPlaying,
  setIsPlaying
}) {
  const { users, setUsers } = useContext(UsersContext);
  const { yourSocket, setYourSocket } = useContext(SocketContext);
  const [waitingPlayerTwo, setWaitingPlayerTwo] = useState(true);
  const { thisUser, setThisUser } = useContext(ThisUserContext);
  const router = useRouter();

  useEffect(() => {
    if (thisUser.name) {
    socket.emit('find', { name: thisUser.name, aliens: users.allAliens });
    let tempThisUser = { ...thisUser };
    tempThisUser.name = '';
    setThisUser(tempThisUser);
    socket.on('your-socketid', (id) => {
      setYourSocket(id);
    });
    socket.on('find', (e) => {
      let obj = { ...users };
      obj.p1.p1name = e.allPlayers[0].p1.p1name;
      obj.p2.p2name = e.allPlayers[0].p2.p2name;
      obj.p1.p1socketId = e.allPlayers[0].p1.p1socketId;
      obj.p2.p2socketId = e.allPlayers[0].p2.p2socketId;
      obj.p1.p1alien = e.allPlayers[0].p1.p1alien;
      obj.p2.p2alien = e.allPlayers[0].p2.p2alien;
      obj.allAliens = e.allPlayers[0].allAliens;
      setUsers(obj);
      localStorage.setItem('users', JSON.stringify(users))
    });
  }
  }, [thisUser, users]);

  useEffect(() => {
    if (users.p1.p1name && users.p2.p2name) {
      setWaitingPlayerTwo(false);
    }
  }, [users]);

  useEffect(() => {
    if (yourSocket === users.p1.p1socketId) {
      setChosenAlien(users.p2.p2alien);
    } else {
      setChosenAlien(users.p1.p1alien);
    }
  }, [waitingPlayerTwo]);

  function handleClick() {
    socket.emit('start-game');
  }

  socket.on('proceed', () => {
    setAlienObjects(users.allAliens);

    setDisplayLobby(false);
    setIsLoading(false);
    if (yourSocket === users.p2.p2socketId) {
      setIsPlaying(false)
    }

  });

  return (
    <div className="modal">
      <div className="text-box">
        <div className="textbox-contents">
          <h2>Lobby</h2>
          <br></br>

          {users.p1.p1name && <p>{users.p1.p1name} is ready</p>}
          {users.p2.p2name && <p>{users.p2.p2name} is ready</p>}
          {waitingPlayerTwo && (
            <>
              <p>waiting for your mate...</p>
              <img src="/assets/flying-saucer-joypixels.gif" width="150px" />
            </>
          )}
          {!waitingPlayerTwo ? (
            <button
              onClick={() => {
                handleClick();
              }}
            >
              start game
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
