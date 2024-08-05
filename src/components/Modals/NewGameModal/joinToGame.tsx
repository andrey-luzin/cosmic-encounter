import React, { FC, useCallback, useState } from 'react';

import './index.scss';
import { Input } from '@/components/FormComponents/Input';
import { Button } from '@/components/FormComponents/Button';
import { error } from 'console';

type JoinToGameProps = {
  onStart: () => void,
};

export const JoinToGame: FC<JoinToGameProps> = ({ onStart }) => {
  const [error, setError] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  
  const handleGameIDChange = (inputValue: string) => {
    setGameId(inputValue);
  };

  const handleInputChange = (inputValue: string) => {
    setPlayerName(inputValue);
  };

  const handleJoin = useCallback(() => {
    console.log('go');
    if (!playerName) {
      return setError("Не заполнено имя игрока");
    }
    setError('');
  }, [playerName]);

  return(
    <>
      <Input
        label='ID игры'
        onInput={(e) => handleGameIDChange(e.target.value)}
        className='new-game-modal__input'
      />
      <Input
        label='Имя игрока'
        onInput={(e) => handleInputChange(e.target.value)}
        className='new-game-modal__input'
      />
      {error && <p className='new-game-modal__error'>{error}</p>}
      <Button size='l' onClick={handleJoin}>Присоединиться к игре</Button>
    </>
  );
};
