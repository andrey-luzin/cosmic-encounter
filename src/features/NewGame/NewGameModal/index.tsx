import React, { FC, useCallback, useEffect, useState } from 'react';

import { Modal, ModalProps } from '@/components/Modal';
import { Tabs } from '@/components/FormComponents/Tabs';
import { Button } from '@/components/FormComponents/Button';
import { HotseatMode } from './hotseatMode';

import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import { PlayerType } from '@/types/PlayerTypes';

import { useGameState } from '@/hooks/useGameState';
import { CreateGame } from './createGame';
import { JoinToGame } from './joinToGame';
import { SelectionRaceModal } from '@/features/NewGame/SelectionRaceModal';

import './index.scss';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [raceSelectionModalIsVisible, setRaceSelectionModalIsVisible] = useState<boolean>(false);
  const [newGameModalIsVisible, setNewGameModalIsVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const { startGame } = useGameState();
  const { state, dispatch } = useStore();
  const { currentPlayer } = state;

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
    startGame(state.gameState.players);
  }, [startGame, state.gameState.players]);

  useEffect(() => {
    setRaceSelectionModalIsVisible(false);
    if (state.gameState.prepareIsStarted) {
      setRaceSelectionModalIsVisible(true);
      setNewGameModalIsVisible(false);
    }
  }, [state.gameState]);

  const handleResetGameState = useCallback(() => {
    dispatch({
      type: ActionTypes.RESET_GAME_STATE,
    });
    onClose();
  }, [dispatch, onClose]);

  // useEffect(() => {
  //   if (!isEmpty(state.gameState)) {
  //     setShowAlert(true)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // TODO: add destroying of modal
  // TODO: add reset modal
  // if (showAlert) {
  //   return(
  //     <Modal
  //       isVisible
  //       onClose={onClose}
  //       title='Вы уверены?'
  //     >
  //       <h2>Весь предыдущий прогресс сбросится</h2>
  //       <div style={{ display: 'flex', gap: '1rem' }}>
  //         <Button size="l" onClick={handleResetGameState}>Да</Button>
  //         <Button size="l" onClick={onClose}>Нет</Button>
  //       </div>
  //     </Modal>
  //   )
  // }

  const { gameId } = state.gameState;

  console.log('state', state);

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
        currentPlayer &&
        <SelectionRaceModal
          isVisible={raceSelectionModalIsVisible}
          onClose={handleSelectRace}
          player={currentPlayer}
        />
      }
    </>
  );
};
