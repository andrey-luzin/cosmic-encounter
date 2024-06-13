import React, { FC, useEffect, useRef } from 'react';
import cn from 'classnames';

import { useStore } from '@/store';
import { CSSLogOffset, CSSLogWidth } from '@/const/css-consts';

import './index.scss';

type GameLogProps = unknown;

export const GameLog: FC<GameLogProps> = () => {
  const { state } = useStore();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const { documentElement } = document;

    documentElement.style.setProperty(
      CSSLogOffset, state.gameLogIsOpen ?
      getComputedStyle(documentElement).getPropertyValue(CSSLogWidth) :
      '0px'
    );
  }, [state.gameLogIsOpen]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo(0, listRef.current.scrollHeight);
    }
  }, [state.gameLog.length]);

  return(
    <div className={cn('game-log', {'game-log--is-visible': state.gameLogIsOpen })}>
      <h2 className='game-log__title'>Игровой лог:</h2>
      <ul className='game-log__list' ref={listRef}>
        {state.gameLog.map((logItem, index) => (
          <li key={index}>
            <time
              dateTime={logItem.timestamp}
              title={new Date(logItem.timestamp).toLocaleString()}
              className='game-log__time'
            >
              {new Date(logItem.timestamp).toLocaleTimeString()}
            </time>
            {' '}–{' '}
            <span className='game-log__log-item' dangerouslySetInnerHTML={{ __html: logItem.message}} />
          </li>
        ))}
      </ul>
    </div>
  );
};
