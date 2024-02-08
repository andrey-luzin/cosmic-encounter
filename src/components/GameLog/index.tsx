import React, { FC, useEffect } from 'react';
import cn from 'classnames';

import './index.scss';
import { useStore } from '@/store';
import { CSSLogOffset, CSSLogWidth } from '@/const/css-consts';

type GameLogProps = unknown;

export const GameLog: FC<GameLogProps> = () => {
  const { state } = useStore();

  useEffect(() => {
    const { documentElement } = document;

    documentElement.style.setProperty(
      CSSLogOffset, state.gameLogIsOpen ?
      getComputedStyle(documentElement).getPropertyValue(CSSLogWidth) :
        '0px'
    );
  }, [state]);

  return(
    <div className={cn('game-log', {'game-log--is-visible': state.gameLogIsOpen })}>
      <h2>Игровой лог:</h2>
      <ul>
        {state.gameLog.map((logItem, index) => (
          <li key={index}>
            {logItem.timestamp} - {logItem.message}
          </li>
        ))}
      </ul>
    </div>
  );
};
