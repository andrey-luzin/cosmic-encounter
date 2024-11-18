import React, { FC, useCallback, useEffect, useState } from 'react';

import { Modal, ModalProps } from '@/components/Modal';
import { Tabs } from '@/components/FormComponents/Tabs';
import { Button } from '@/components/FormComponents/Button';
import { HotseatMode } from './hotseatMode';

import { useStore } from '@/store';

import { useGameState } from '@/hooks/useGameState';
import { CreateGame } from './createGame';
import { JoinToGame } from './joinToGame';
import { SelectionRaceModal } from '@/features/NewGame/SelectionRaceModal';

import { WaitingPlayersList } from '../WaitingPlayersList';
import { Loader } from '@/components/Loader';

import './index.scss';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [raceSelectionModalIsVisible, setRaceSelectionModalIsVisible] = useState<boolean>(false);
  const [newGameModalIsVisible, setNewGameModalIsVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [waitingModalIsVisible, setWaitingModalIsVisible] = useState<boolean>(false);

  const { startGame, deleteGame } = useGameState();
  const { state } = useStore();
  const { currentPlayer, gameState } = state;
  const { players } = gameState;

  useEffect(() => {
    if (gameState?.gameIsStarted && newGameModalIsVisible) {
      console.log('setShowAlert');
      setShowAlert(true);
    }
  }, [gameState?.gameIsStarted, newGameModalIsVisible]);

  useEffect(() => {
    setNewGameModalIsVisible(isVisible);
  }, [isVisible]);

  const handleCloseMainModal = useCallback(() => {
    setNewGameModalIsVisible(false);
    onClose();
  }, [onClose]);

  const handleShowRaceSelection = useCallback(() => {
    setRaceSelectionModalIsVisible(true);
    setNewGameModalIsVisible(false);
  }, []);

  const handleSelectRace = useCallback(() => {
    setRaceSelectionModalIsVisible(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!gameState.gameIsStarted) {
      startGame(players);
    }
  }, [startGame, players, gameState.gameIsStarted]);

  useEffect(() => {
    setRaceSelectionModalIsVisible(false);
    if (gameState.prepareIsStarted && !gameState.gameIsStarted) {
      setRaceSelectionModalIsVisible(true);
      setNewGameModalIsVisible(false);
    }
  }, [gameState]);

  const handleResetGameState = useCallback(() => {
    deleteGame().then(() => {
      onClose();
    });
  }, [deleteGame, onClose]);

  useEffect(() => {
    if (currentPlayer?.race && players && !gameState.gameIsStarted) {
      setWaitingModalIsVisible(true);
    }
  }, [currentPlayer?.race, gameState.gameIsStarted, players]);

  useEffect(() => {
    if (gameState.gameIsStarted) {
      console.log('onClose');
      onClose();
      setWaitingModalIsVisible(false);
    }
  }, [gameState.gameIsStarted, onClose]);

  const handleCloseWaitingModal = () => {
    setWaitingModalIsVisible(false);
  };

  if (showAlert) {
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

    return(
      <Modal
        isVisible
        onClose={handleCloseAlert}
        title='Вы уверены?'
      >
        <h2>Весь предыдущий прогресс сбросится</h2>
        <div className='new-game-modal__cancel-info'>
          <Button size="l" onClick={handleResetGameState}>Да</Button>
          <Button size="l" onClick={handleCloseAlert}>Нет</Button>
        </div>
      </Modal>
    );
  }

  const { gameId } = gameState;

  return(
    <>
      <Modal
        isVisible={newGameModalIsVisible}
        onClose={handleCloseMainModal}
        title='Новая игра'
        canClose={!gameId}
      >
        <div className="new-game-modal">
          <Tabs>
            <Tabs.Panel title='Создать игру' disabled={Boolean(gameId)}>
              <CreateGame onStart={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title='Хотсит' disabled={Boolean(gameId)}>
              <HotseatMode onStart={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title='Присоединиться к игре' disabled={Boolean(gameId)}>
              <JoinToGame onStart={handleShowRaceSelection} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </Modal>
      {
        currentPlayer && !currentPlayer?.race &&
        <SelectionRaceModal
          isVisible={raceSelectionModalIsVisible}
          onClose={handleSelectRace}
          player={currentPlayer}
        />
      }
      {
        <Modal
          isVisible={waitingModalIsVisible}
          onClose={handleCloseWaitingModal}
          title='Ожидание игроков'
          canClose={false}
        >
          <div className='new-game-modal__loader-block'>
            {
              players &&
              <WaitingPlayersList players={players} />
            }
            <Loader className='new-game-modal__loader' />
          </div>
        </Modal>
      }
    </>
  );
};
