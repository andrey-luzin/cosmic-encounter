import React, { FC, use, useCallback, useEffect, useState } from 'react';
import { Modal, ModalProps } from '@/components/Modal';

import { Tabs } from '@/components/FormComponents/Tabs';

import { HotseatMode } from './hotseatMode';
import { SelectionRaceModal } from '../SelectionRaceModal';

import './index.scss';
import { useStore } from '@/store';
import { PlayerType } from '@/types/PlayerTypes';
import { ActionTypes } from '@/store/types';
import { isEmpty } from 'lodash';
import { Button } from '@/components/FormComponents/Button';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { state, dispatch } = useStore();

  const [raceSelectionModalIsVisible, setRaceSelectionModalIsVisible] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType | null>(null);
  const [newGameModalIsVisible, setNewGameModalIsVisible] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    setNewGameModalIsVisible(isVisible);
  }, [isVisible]);

  // useEffect(() => {
  //   if (!isEmpty(state.gameState)) {
  //     setShowAlert(true)
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
    if ('players' in state.gameState && state.gameState.players) {
      const playerWithoutRace = Object.entries(state.gameState.players).find(([_, value]) => {
        return !value.race;
      });
      
      if (playerWithoutRace) {
        const [playerName, playerData] = playerWithoutRace;
        setCurrentPlayer({
          ...playerData,
          name: playerName,
        });
      }
    }
  }, [state.gameState]);

  const handleResetGameState = useCallback(() => {
    dispatch({
      type: ActionTypes.RESET_GAME_STATE,
    });
    onClose();
  }, [dispatch, onClose]);

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

  return(
    <>
      <Modal
        isVisible={newGameModalIsVisible}
        onClose={handleCloseMainModal}
        title='Новая игра'
      >
        <div className="new-game-modal">
          <Tabs>
            <Tabs.Panel title='Хотсит'>
              <HotseatMode onStart={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title='Online' disabled />
            <Tabs.Panel title='Присоединиться к игре' disabled />
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
