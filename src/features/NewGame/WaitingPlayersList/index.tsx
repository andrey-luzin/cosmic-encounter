import React, { FC } from 'react';

import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';

type WaitingPlayersListProps = {
  players: { [playerName: string]: PlayerType }
};

export const WaitingPlayersList: FC<WaitingPlayersListProps> = ({ players }) => {
  return(
    <div className="waiting-players-list">
      <h3>Список игроков</h3>
      {
        players && 
        <ul className='waiting-players-list__player-list'>
          {Object.values(players).map(player => {
            return (
              <li
                className='waiting-players-list__player'
                key={player.name}
                style={{ color: player.color }}
              >{player.name}</li>
            );
          })}
        </ul>
      }
    </div>
  );
};
