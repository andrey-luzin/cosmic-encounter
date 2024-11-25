import React, { FC, useCallback } from 'react';

import './index.scss';
import { useStore } from '@/store';
import { Button } from '@/components/FormComponents/Button';
import { ActionTypes } from '@/store/types';
import { LS_ITEM_GAME_NICK } from '@/const';

type JoinToActiveGameProps = unknown;

export const JoinToActiveGame: FC<JoinToActiveGameProps> = () => {
  const { state, dispatch } = useStore();

  const handleJoinGame = useCallback(() => {
    const name = localStorage.getItem(LS_ITEM_GAME_NICK);

    if (name) {
      const currentPlayer = state.gameState.players?.[name];

      if (currentPlayer) {
        dispatch({
          type: ActionTypes.SET_CURRENTLY_PLAYER,
          payload: currentPlayer,
        });
      }
    }
  }, [dispatch, state.gameState.players]);

  return(
    <div className="new-game-modal__active-games-list">
      <div className="new-game-modal__active-game">
        {state.gameState.gameId}
        <Button onClick={handleJoinGame}>Присоединиться</Button>
      </div>
    </div>
  );
};
