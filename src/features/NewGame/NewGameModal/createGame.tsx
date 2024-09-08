import React, { FC, useCallback, useEffect, useState } from 'react';
import { addDoc, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"; 

import { ISelectOption, Select } from '@/components/FormComponents/Select';
import { Button } from '@/components/FormComponents/Button';
import { Input } from '@/components/FormComponents/Input';
import { Loader } from '@/components/Loader';

import { db } from '@/firebase.config';
import { collection } from 'firebase/firestore';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import { getRandomObjects } from '@/helpers';
import { playersColors } from './const';
import { LS_ITEM_GAME_ID, MAX_PLAYERS_COUNT, MIN_PLAYERS_COUNT } from '@/const';
import { DBCollectionsEnum } from '@/types/DatabaseTypes';

import { WaitingPlayersList } from '../WaitingPlayersList';
import { GameStateType } from '@/types/GameStateTypes';

import ClipboardIcon from '@/public/icons/clipboard.svg';
import ClipboardCheckIcon from '@/public/icons/clipboard-check.svg';

import './index.scss';
import { racesCards } from '@/data/races-cards';
import { cosmicCards } from '@/data/cosmic-cards';
import { destinyCards } from '@/data/destiny-cards';

type CreateGameProps = {
  onStart: () => void,
};

export const CreateGame: FC<CreateGameProps> = ({ onStart }) => {
  const [playersCount, setPlayersCount] = useState<number>(MIN_PLAYERS_COUNT);
  const [playerName, setPlayerName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [waitingForPlayers, setWaitingForPlayers] = useState(false);
  const [gameId, setGameId] = useState<string>('');
  const [gameBegins, setGameBegins] = useState(false);
  const [gameIdCopied, setGameIdCopied] = useState<boolean>(false);

  const { state, dispatch } = useStore();
  const { players } = state.gameState;

  const getCountPlayerOptions = (): ISelectOption[] => {
    const result = [];
  
    for (let i = MIN_PLAYERS_COUNT; i <= MAX_PLAYERS_COUNT; i++) {
      result.push({ value: i, label: String(i) });
    }
    
    return result;
  };

  useEffect(() => {
    if (players && Object.keys(players).length === playersCount) {
      (async () => {
        const docRef = doc(db, DBCollectionsEnum.Games, gameId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          
          await updateDoc(docRef, {
            gameState: {
              ...docSnap.data().gameState,
              prepareIsStarted: true,
            } 
          }).then(() => {
            dispatch({
              type: ActionTypes.SET_GAME_STATE,
              payload: { prepareIsStarted: true },
            });
          });
        }
      })();
    }
  }, [dispatch, gameId, players, playersCount]);

  const handleCountChange = (option: ISelectOption) => {
    setPlayersCount(Number(option.value));
  };

  const handleInputChange = (inputValue: string) => {
    setPlayerName(inputValue.trim());
  };

  const handleCreateGame = useCallback(async () => {
    if (!playerName) {
      return setError("Не заполнено имя игрока");
    }
    setError('');
    setGameBegins(true);

    const iteratedPlayersList = Array.from({ length: playersCount }, (_, k) => k);
    const randomNumber = getRandomObjects(iteratedPlayersList)[0];
    const randomColor = getRandomObjects(playersColors)[0];
    const newPlayer =  {
      name: playerName,
      color: randomColor,
      turnOrder: randomNumber
    };

    // game creation
    await addDoc(collection(db, DBCollectionsEnum.Games), {
      gameState: {
        createdAt: new Date().toISOString(),
        playersCount,
        gameIsStarted: false,
        players: {
          [playerName]: newPlayer
        }
      } as Partial<GameStateType>,
      decks: {
        races: racesCards.filter(card => !card.isDisable),
        cosmicCards,
        destinyCards
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
        dispatch({
          type: ActionTypes.SET_CURRENTLY_PLAYER,
          payload: newPlayer,
        });
      })
      .catch(error => {
        console.log(error);
        setError(error.message || String(error));
        setGameBegins(false);
      });
  }, [playerName, playersCount, dispatch]);

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

  useEffect(() => {
    if (gameIdCopied) {
      setTimeout(() => {
        setGameIdCopied(false);
      }, 15000);
    }
  }, [gameIdCopied]);

  const handleCopyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(gameId).then(
      () => setGameIdCopied(true),
      () => setGameIdCopied(false),
    );
  }, [gameId]);

  return(
    <>
      {
        !waitingForPlayers &&
        <form onSubmit={e => e.preventDefault()} className='new-game-modal__form'>
          <Select
            onChange={(e) => e && handleCountChange(e as ISelectOption)}
            options={getCountPlayerOptions()}
            label="Количество игроков"
            className="new-game-modal__count-select"
            value={{
              value: playersCount,
              label: String(playersCount),
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
            className='new-game-modal__btn'
          >Создать игру</Button>
        </form>
      }
      {
        waitingForPlayers &&
        <div className='new-game-modal__loader-block'>
          <h2 className='new-game-modal__subtitle'>Ожидание игроков</h2>
          <div className='new-game-modal__share'>
            Поделитесь с игроками Game ID: <b>{gameId}</b>
            <button
              className='new-game-modal__copy-to-clipboard'
              onClick={handleCopyToClipboard}
            >
              {!gameIdCopied ? <ClipboardIcon /> : <ClipboardCheckIcon />}
            </button>
          </div>
          {
            players &&
            <WaitingPlayersList players={players} />
          }
          <Loader className='new-game-modal__loader' />
          <Button onClick={handleDeleteGame} view='warning'>Удалить игру</Button>
        </div>
      }
    </>
  );
};
