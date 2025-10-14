import React, { FC, useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n';

import { Modal, ModalProps } from '@/components/Modal';
import { Tabs } from '@/components/FormComponents/Tabs';
import { HotseatMode } from './hotseatMode';

import { useStore } from '@/store';

import { useGameState } from '@/hooks/useGameState';
import { CreateGame } from './createGame';
import { JoinToGame } from './joinToGame';
import { SelectionRaceModal } from '@/features/NewGame/SelectionRaceModal';

import { WaitingPlayersList } from '../WaitingPlayersList';
import { Loader } from '@/components/Loader';

import './index.scss';
import { JoinToActiveGame } from './joinToActiveGame';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { t } = useI18n();
  const [raceSelectionModalIsVisible, setRaceSelectionModalIsVisible] = useState<boolean>(false);
  const [newGameModalIsVisible, setNewGameModalIsVisible] = useState<boolean>(false);
  const [waitingModalIsVisible, setWaitingModalIsVisible] = useState<boolean>(false);

  const { startGame } = useGameState();
  const { state } = useStore();
  const { currentPlayer, gameState } = state;
  const { players } = gameState;

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

  useEffect(() => {
    if (currentPlayer?.race && players && !gameState.gameIsStarted) {
      setWaitingModalIsVisible(true);
    }
  }, [currentPlayer?.race, gameState.gameIsStarted, players]);

  useEffect(() => {
    if (gameState.gameIsStarted) {
      onClose();
      setWaitingModalIsVisible(false);
    }
  }, [gameState.gameIsStarted, onClose]);

  const handleCloseWaitingModal = () => {
    setWaitingModalIsVisible(false);
  };

  const { gameId } = gameState;

  return(
    <>
      <Modal
        isVisible={newGameModalIsVisible}
        onClose={handleCloseMainModal}
        title={t('newGame.title')}
        canClose={!gameId}
      >
        <div className="new-game-modal">
          <Tabs>
            <Tabs.Panel title={t('newGame.create')}>
              <CreateGame onStart={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title={t('newGame.join')}>
              <JoinToGame onStart={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title={t('newGame.activeGame')} disabled={Boolean(!gameId)}>
              <JoinToActiveGame />
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
          title={t('newGame.waitingPlayers')}
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
