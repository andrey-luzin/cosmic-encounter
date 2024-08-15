import React, { FC, useCallback, useState } from 'react';

import { Input } from '@/components/FormComponents/Input';
import { Button } from '@/components/FormComponents/Button';
import { WaitingPlayersList } from '../WaitingPlayersList';
import { Loader } from '@/components/Loader';
import { db } from '@/firebase.config';
import { DBCollectionsEnum } from '@/types/DatabaseTypes';
import { doc, getDoc } from 'firebase/firestore';

import './index.scss';
import { PlayerType } from '@/types/PlayerTypes';
import { GameStateType } from '@/types/GameStateTypes';
import { getRandomObjects } from '@/helpers';

type JoinToGameProps = {
  onStart: () => void,
};

export const JoinToGame: FC<JoinToGameProps> = ({ onStart }) => {
  const [error, setError] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);

  
  const handleGameIDChange = (inputValue: string) => {
    setGameId(inputValue);
  };

  const handleInputChange = (inputValue: string) => {
    setPlayerName(inputValue);
  };

  const handleJoin = useCallback(async () => {
    console.log('go');

    if (!playerName) {
      return setError("Не заполнено имя игрока");
    }

    const docRef = doc(db, DBCollectionsEnum.Games, gameId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return setError("Такой игры нет");
    }
    if (docSnap.exists()) {
      const { players }  = docSnap.data().gameState;

      if (Object.keys(players).find(player =>  player === playerName)) {
        return setError('Такое имя игрока уже занято');
      }
      const { playersCounts }  = docSnap.data().gameState;

      const iteratedPlayersList =
        Array.from({ length: playersCounts }, (_, k) => k).filter(order => {
            const foundPlayer =
              (Object.values(players) as Partial<PlayerType>[]).find((player) => {
                return player.turnOrder === order;
            });

            if (foundPlayer) {
              return false;
            }
            return true;
          });

      console.log(iteratedPlayersList);
      const randomNumber =
        iteratedPlayersList.length > 1 ?
          getRandomObjects(iteratedPlayersList)[0] :
          iteratedPlayersList[0];

      // TODO: найти цвете (как turnOrder?)
    }

    setError('');
  }, [gameId, playerName]);

  return(
    <>
      {
        !waitingForPlayers &&
        <form onSubmit={e => e.preventDefault()} className='new-game-modal__form'>
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
          <Button
            size='l'
            onClick={handleJoin}
            type="submit"
            className='new-game-modal__btn'
          >Присоединиться к игре</Button>
        </form>
      }
      {
        waitingForPlayers &&
        <div className='new-game-modal__loader-block'>
          <h2 className='new-game-modal__subtitle'>Ожидание игроков</h2>
          {/* <WaitingPlayersList players={players} /> */}
          <Loader className='new-game-modal__loader' />
        </div>
      }
    </>
  );
};

