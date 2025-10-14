import React, { FC } from 'react';
import { useI18n } from '@/i18n';

import { Modal, ModalProps } from '@/components/Modal';
import { DestinyCardEnum, DestinyCardType } from '@/types/CardTypes';
import { DESTINIES_PATH } from '@/const';

import { Button } from '@/components/FormComponents/Button';
import { useStore } from '@/store';
import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';

type SelectionRaceModalProps = Pick<ModalProps, 'isVisible' | 'onClose'> & {
  destinyCard: DestinyCardType
};

export const DestinyCardModal: FC<SelectionRaceModalProps> = ({
  isVisible,
  onClose,
  destinyCard
}) => {
  const { t } = useI18n();
  const { state } = useStore();

  const { gameState } = state;
  const { activePlayer, players } = gameState;
  const gamePlayers = Object.values(players ?? {});

  const handleAttackPlayer = (player: PlayerType) => {
    console.log(`%cатакуем игрока ${player.name}`, `color: ${player.color};`);
  };

  const handleRestoreColony = () => {
    console.log('восстанавливаем колонию');
  };

  const handleGetNewDestinyCard = () => {
    console.log('берем новую карту');
  };

  const AttackButton = ({ player }: { player: PlayerType } ) => {
    return (
      <Button className="destiny-card-modal__button" onClick={() => handleAttackPlayer(player)}>
        {t('destiny.attackPlayer')} <span style={{ color: player.color}}>{player.name}</span>
      </Button>
    );
  };

  if (!(activePlayer && players)) {
    return null;
  }

  return(
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title={t('destiny.chooseAction')}
      className='destiny-card-modal'
      canClose={false}
    >
      <div className="destiny-card-modal__wrapper">
        <img
          src={`/images/${DESTINIES_PATH}/${destinyCard.id}.webp`}
          className="destiny-card-modal__image"
          alt=""
        />
        <div className="destiny-card-modal__button-group">
          {
            gamePlayers.length && 
            <>
              {
                (
                  destinyCard.type === DestinyCardEnum.Joker ||
                  (
                    destinyCard.type === DestinyCardEnum.PlayerCard
                    && destinyCard.color === players[activePlayer].color
                  )
                ) &&
                <>
                  {
                    gamePlayers.filter(player => player.name !== gameState.activePlayer).map(player => {
                      return (
                        <AttackButton key={player.name} player={player} />
                      );
                    })
                  }
                </>
              }
            </>
          }
          {
            destinyCard.type === DestinyCardEnum.PlayerCard &&
            destinyCard.color !== players[activePlayer]?.color &&
            <>
              {
                (() => {
                  const player = gamePlayers.find(player => player.color === destinyCard.color);
                  if (player) {
                    return <AttackButton player={player} />;
                  }
                })()
              }
            </>
          }
          {
            destinyCard.type === DestinyCardEnum.PlayerCard
            && destinyCard.color === players[activePlayer]?.color &&
            <>
              <Button className="destiny-card-modal__button" onClick={() => handleRestoreColony()}>
                {t('destiny.restoreHomeColony')}
              </Button>
              <Button className="destiny-card-modal__button" onClick={() => handleGetNewDestinyCard()}>
                {t('destiny.takeNewCard')}
              </Button>
            </>
          }
          {/* TODO: докрутить логику определения карт в варпе */}
          {
            destinyCard.type === DestinyCardEnum.SpecialCard &&
            <>
              {
                (() => {
                  const player = gamePlayers.find(
                    player => player.turnOrder === (players[activePlayer].turnOrder + 1 || 0)
                  );
                  if (player) {
                    return <AttackButton player={player} />;
                  }
                })()
              }
            </>
          }
        </div>
      </div>
    </Modal>
  );
};
