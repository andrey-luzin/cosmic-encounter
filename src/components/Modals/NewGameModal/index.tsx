import React, { FC, useCallback, useEffect, useState } from 'react';

import { Modal, ModalProps } from '@/components/Modal';
import { Tabs } from '@/components/FormComponents/Tabs';
import { Button } from '@/components/FormComponents/Button';
import { HotseatMode } from './hotseatMode';
import { SelectionRaceModal } from '../SelectionRaceModal';

import { initialState, useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import { PlayerType } from '@/types/PlayerTypes';
import { racesCards } from '@/data/races-cards';

import './index.scss';

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
    dispatch({
      type: ActionTypes.SET_RACES_DECK,
      payload: initialState.decks.races,
    });
  }, [dispatch]);

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
    setRaceSelectionModalIsVisible(false);
    if ('players' in state.gameState && state.gameState.players) {
      const playerWithoutRace = Object.entries(state.gameState.players).find(([_, value]) => {
        return !value.race;
      });
      
      if (playerWithoutRace) {
        setTimeout(() => {
          const [playerName, playerData] = playerWithoutRace;

          setCurrentPlayer({
            ...playerData,
            name: playerName,
          });
          setRaceSelectionModalIsVisible(true);
        }, 350);
      }
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
        'players' in state.gameState && state.gameState.players &&
          Object.keys(state.gameState.players).map(player => {
            if (player === currentPlayer?.name) {
              return (
                <SelectionRaceModal
                  isVisible={raceSelectionModalIsVisible}
                  onClose={handleSelectRace}
                  player={currentPlayer}
                  key={player}
                />
              );
            }
          })
      }
    </>
  );
};
