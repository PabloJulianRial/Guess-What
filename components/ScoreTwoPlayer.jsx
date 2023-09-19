import { useContext } from 'react';
import { UserStatsContext } from '@/contexts/UserStats';
import { UsersContext } from '@/contexts/User';

export default function ScoreTwoPlayer() {
    const { statsObject, setStatsObject } = useContext(UserStatsContext);
    const { users, setUsers } = useContext(UsersContext);

    return (
        <div className="two-player-score">
            <p className="scoreboard">{users.p1.p1name} {statsObject.username === users.p1.p1name ? statsObject.wins : statsObject.losses} - {statsObject.username === users.p2.p2name ? statsObject.wins : statsObject.losses} {users.p2.p2name}</p>
        </div>
    )
}