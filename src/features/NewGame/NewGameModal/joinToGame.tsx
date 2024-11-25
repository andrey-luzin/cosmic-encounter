import React, { FC, useCallback, useState } from 'react';

import { Input } from '@/components/FormComponents/Input';
import { Button } from '@/components/FormComponents/Button';
import { WaitingPlayersList } from '../WaitingPlayersList';
import { Loader } from '@/components/Loader';
import { db } from '@/firebase.config';
import { DBCollectionsEnum } from '@/types/DatabaseTypes';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import './index.scss';
import { PlayerType } from '@/types/PlayerTypes';
import { GameStateType } from '@/types/GameStateTypes';
import { getRandomObjects } from '@/helpers';
import { playersColors } from './const';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';
import { LS_ITEM_GAME_NICK } from '@/const';

type JoinToGameProps = {
  onStart: () => void,
};

export const JoinToGame: FC<JoinToGameProps> = ({ onStart }) => {
  const [error, setError] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);

  const { state, dispatch } = useStore();
  const { players } = state.gameState;

  const handleGameIDChange = (inputValue: string) => {
    setGameId(inputValue);
  };

  const handleInputChange = (inputValue: string) => {
    setPlayerName(inputValue.trim());
  };

  const handleJoin = useCallback(async () => {
    setError('');

    if (!playerName) {
      return setError("Не заполнено имя игрока");
    }

    const docRef = doc(db, DBCollectionsEnum.Games, gameId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return setError("Такой игры нет");
    }
    if (docSnap.exists()) {
      const { players }: { players: GameStateType['players'] } = docSnap.data().gameState;

      if (Object.keys(players).find(player =>  player === playerName)) {
        return setError('Такое имя игрока уже занято');
      }
      const { playersCount }  = docSnap.data().gameState;

      const getDifferentPlayersList = <T extends keyof PlayerType>(
        valuesList: Required<PlayerType[T][]>,
        sign: T
      ): PlayerType[T][] => {
        return valuesList.filter(order => {
          const foundPlayer = (Object.values(players)).find((player) => {
            return player[sign] === order;
          });
      
          return !foundPlayer;
        });
      };

      const playersListByTurnOrder =
        getDifferentPlayersList(
          Array.from({ length: playersCount }, (_, k) => k),
          'turnOrder'
        );
      // turnOrder:
      const randomTurnOrder =
        playersListByTurnOrder.length > 1 ?
          getRandomObjects(playersListByTurnOrder)[0] :
          playersListByTurnOrder[0];

      const playersListByColor = getDifferentPlayersList(playersColors, 'color');
      // color:
      const randomColor =
      playersListByColor.length > 1 ?
          getRandomObjects(playersListByColor)[0] :
          playersListByColor[0];
  
      const newPlayer =  {
        [playerName]: {
          name: playerName,
          color: randomColor,
          turnOrder: randomTurnOrder
        }
      };

      await updateDoc(docRef, {
        [`gameState.players`]: { ...players, ...newPlayer }
      })
        .then(() => {
          setWaitingForPlayers(true);
          dispatch({
            type: ActionTypes.SET_GAME_STATE,
            payload: { gameId },
          });
          dispatch({
            type: ActionTypes.SET_CURRENTLY_PLAYER,
            payload: newPlayer[playerName],
          });
          localStorage.setItem(LS_ITEM_GAME_NICK, playerName);

          if (players && Object.keys(players).length === playersCount) {
            (async () => {
              await updateDoc(docRef, {
                'gameState.prepareIsStarted': true
              });
              dispatch({
                type: ActionTypes.SET_GAME_STATE,
                payload: { prepareIsStarted: true },
              });
            })();
          }
        })
        .catch(error => {
          console.log(error);
          setError(error.message || String(error));
        });
    }
  }, [dispatch, gameId, playerName]);

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
          {
            players &&
            <WaitingPlayersList players={players} />
          }
          <Loader className='new-game-modal__loader' />
        </div>
      }
    </>
  );
};

