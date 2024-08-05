import React, { FC, useCallback, useState } from 'react';
import { addDoc, deleteDoc, doc, getDoc } from "firebase/firestore"; 

import { ISelectOption, Select } from '@/components/FormComponents/Select';
import { Button } from '@/components/FormComponents/Button';
import { Input } from '@/components/FormComponents/Input';
import { Loader } from '@/components/Loader';

import { db } from '@/firebase.config';
import { collection } from 'firebase/firestore';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import { getRandomObjects } from '@/helpers';
import { playersOptions } from './const';
import { LS_ITEM_GAME_ID, MAX_PLAYERS_COUNT, MIN_PLAYERS_COUNT } from '@/const';
import { PlayerType } from '@/types/PlayerTypes';
import { DBCollectionsEnum } from '@/types/DatabaseTypes';

import './index.scss';

type CreateGameProps = {
  onStart: () => void,
};

export const CreateGame: FC<CreateGameProps> = ({ onStart }) => {
  const [countPlayers, setCountPlayers] = useState<number>(MIN_PLAYERS_COUNT);
  const [playerName, setPlayerName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [gameId, setGameId] = useState<string>('');
  const [gameBegins, setGameBegins] = useState(false);

  const [players, setPlayers] = useState<{ [playerName: string]: PlayerType }>({});

  const { dispatch } = useStore();
  
  const getCountPlayerOptions = (): ISelectOption[] => {
    const result = [];
  
    for (let i = MIN_PLAYERS_COUNT; i <= MAX_PLAYERS_COUNT; i++) {
      result.push({ value: i, label: String(i) });
    }
    
    return result;
  };

  const handleCountChange = (option: ISelectOption) => {
    setCountPlayers(Number(option.value));
  };

  const handleInputChange = (inputValue: string) => {
    setPlayerName(inputValue);
  };

  const setPlayersData = async (id: string) => {
    const docRef = doc(db, DBCollectionsEnum.Games, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPlayers(docSnap.data().gameState.players);
    }
  };

  const handleCreateGame = useCallback(async () => {
    if (!playerName) {
      return setError("Не заполнено имя игрока");
    }
    setError('');
    setGameBegins(true);

    const iteratedPlayersList = Array.from({ length: countPlayers }, (_, k) => k);
    const randomNumber = getRandomObjects(iteratedPlayersList)[0];
    const randomColor = getRandomObjects(playersOptions)[0].color;

    // game creation
    await addDoc(collection(db, DBCollectionsEnum.Games), {
      gameState: {
        playersCounts: countPlayers,
        gameIsStarted: false,
        players: {
          [playerName]: {
            name: playerName,
            color: randomColor,
            turnOrder: randomNumber
          }
        }
      }
    })
      .then((ref) => {
        const { id } = ref;

        setGameId(id);
        setWaitingForPlayers(true);
        dispatch({
          type: ActionTypes.SET_GAME_STATE,
          payload: { gameId: id },
        });
        localStorage.setItem(LS_ITEM_GAME_ID, id);

        setPlayersData(id);
      })
      .catch(error => {
        console.log(error);
        setError(String(error));
        setGameBegins(false);
      });
  }, [playerName, countPlayers, dispatch]);

  // game deleting
  const handleDeleteGame = useCallback(async () => {
    const id = gameId || (localStorage.getItem(LS_ITEM_GAME_ID) as string);
    await deleteDoc(doc(db, DBCollectionsEnum.Games, id)).then(() => {
      setWaitingForPlayers(false);
      setGameBegins(false);
      dispatch({
        type: ActionTypes.RESET_GAME_STATE,
      });
    });
  }, [dispatch, gameId]);

  return(
    <>
      {
        !waitingForPlayers &&
        <form>
          <Select
            onChange={(e) => e && handleCountChange(e as ISelectOption)}
            options={getCountPlayerOptions()}
            label="Количество игроков"
            className="new-game-modal__count-select"
            value={{
              value: countPlayers,
              label: String(countPlayers),
            }}
          />
          <Input
            label='Имя игрока'
            onInput={(e) => handleInputChange(e.target.value)}
            className='new-game-modal__input'
          />
          {error && <p className='new-game-modal__error'>{error}</p>}
          <Button
            disabled={gameBegins}
            size='l'
            onClick={handleCreateGame}
            type="submit"
          >Создать игру</Button>
        </form>
      }
      {
        waitingForPlayers &&
        <div className='new-game-modal__loader-block'>
          <h2 className='new-game-modal__subtitle'>Ожидание игроков</h2>
          <div>Поделитесь с игроками Game ID: <b>{gameId}</b></div>
          <div className='new-game-modal__list-block'>
            <h3>Список игроков</h3>
            {
              players && 
              <ul className='new-game-modal__player-list'>
                {Object.values(players).map(player => {
                  return (
                    <li
                      className='new-game-modal__player'
                      key={player.name}
                      style={{ color: player.color }}
                    >{player.name}</li>
                  );
                })}
              </ul>
            }
          </div>
          <Loader className='new-game-modal__loader' />
          <Button onClick={handleDeleteGame} view='warning'>Удалить игру</Button>
        </div>
      }
    </>
  );
};
