import React, { FC, useCallback, useEffect, useState } from 'react';

import { Modal, ModalProps } from '@/components/Modal';
import { Button } from '@/components/FormComponents/Button';
import { CardModal } from '@/components/CardModal';

import { useGetRaceCards } from '@/hooks/useGetRaceCards';
import { useGameState } from '@/hooks/useGameState';

import { RaceType } from '@/types/RacesTypes';
import { PlayerType } from '@/types/PlayerTypes';
import { FLARES_PATH, RACES_PATH, RACES_PREVIEW_PATH } from '@/const';
import { useI18n } from '@/i18n';

import './index.scss';

type SelectionRaceModalProps = Pick<ModalProps, 'isVisible' | 'onClose'> & {
  player: PlayerType,
};

export const SelectionRaceModal: FC<SelectionRaceModalProps> = ({
  isVisible,
  onClose,
  player,
}) => {
  const [selectedRace, setSelectedRace] = useState<RaceType | null>(null);
  const [fullRaceSrc, setfullRaceSrc] = useState<string>('');
  const [flareRaceSrc, setFlareRaceSrc] = useState<string>('');
  const { t } = useI18n();

  const { races, getRaces } = useGetRaceCards();

  const { selectRace } = useGameState();

  useEffect(() => {
    getRaces(2);
  }, [getRaces]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    selectRace({ player, selectedRace });
  }, [selectRace, player, selectedRace]);

  const handleRaceChange = (race: RaceType) => {
    setSelectedRace(race);
  };

  const handleRaceHoverEnter = (race: RaceType) => {
    setTimeout(() => {
      setfullRaceSrc(`/images/${RACES_PATH}/${race.id}.webp`);
      setFlareRaceSrc(`/images/${FLARES_PATH}/${race.id}.webp`);
    }, 500);
  };

  const handleRaceHoverLeave = () => {
    setfullRaceSrc('');
    setFlareRaceSrc('');
  };

  return(
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      canClose={false}
      title={<>
        {t('race.selectTitlePrefix')}
        &nbsp;<span style={{ color: player.color}}>{player.name}</span>
      </>}
      className='selection-race-modal'
    >
      <form className="selection-race-modal__inner" onSubmit={handleSubmit}>
        <div className="selection-race-modal__race-wrapper">
          {
            races.map(race => {
              const src = `/images/${RACES_PREVIEW_PATH}/${race.id}.webp`;

              return (
                <label
                  key={race.id}
                  className='selection-race-modal__race'
                >
                  <input
                    name="race-select"
                    id={String(race.id)}
                    type='radio'
                    className='selection-race-modal__race-input'
                    onChange={() => handleRaceChange(race)}
                  />
                  <img
                    src={src}
                    className="selection-race-modal__race-image"
                    alt=""
                    onPointerEnter={() => handleRaceHoverEnter(race)}
                    onPointerLeave={handleRaceHoverLeave}
                  />
                  <span className='selection-race-modal__race-name'>{t(`races.${race.id}`)}</span>
                </label>
              );
            })
          }
        </div>
        <Button
          size="l"
          type="submit"
          className='selection-race-modal__start-btn'
          disabled={!selectedRace}
        >{t('common.start')}</Button>
      </form>
      <CardModal
        src={fullRaceSrc}
        isVisible={Boolean(fullRaceSrc)}
        clientX={Infinity}
      />
      <CardModal
        src={flareRaceSrc}
        isVisible={Boolean(flareRaceSrc)}
        clientX={-Infinity}
        isLess
      />
    </Modal>
  );
};
