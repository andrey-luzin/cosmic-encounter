import React, { FC } from 'react';
import { useI18n } from '@/i18n';

import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';

type WaitingPlayersListProps = {
  players: { [playerName: string]: PlayerType }
};

export const WaitingPlayersList: FC<WaitingPlayersListProps> = ({ players }) => {
  const { t } = useI18n();
  return(
    <div className="waiting-players-list">
      {
        players && 
        <ul className='waiting-players-list__player-list'>
          {Object.values(players).map(player => {
            return (
              <li
                className='waiting-players-list__player'
                key={player.name}
              >
                <span style={{ color: player.color }}>{player.name}</span>
                {player.race && <>&emsp;{t(`races.${player.race.id}`)}</>}
              </li>
            );
          })}
        </ul>
      }
    </div>
  );
};
