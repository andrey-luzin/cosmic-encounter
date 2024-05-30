import React, { FC, use, useCallback, useEffect, useState } from 'react';

import { Modal, ModalProps } from '@/components/Modal';

import './index.scss';
import { useGetRaceCards } from '@/hooks/useGetRaceCards';
import { FLARES_PATH, RACES_PATH, RACES_PREVIEW_PATH } from '@/const';
import { Button } from '@/components/FormComponents/Button';
import { RaceType } from '@/types/RacesTypes';
import { CardModal } from '@/components/CardModal';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';
import { PlayerType } from '@/types/PlayerTypes';

type SelectionRaceModalProps = Pick<ModalProps, 'isVisible' | 'onClose'> & {
  player: Pick<PlayerType, ('name' | 'color')>,
};

export const SelectionRaceModal: FC<SelectionRaceModalProps> = ({
  isVisible,
  onClose,
  player,
}) => {
  const { state, dispatch } = useStore();

  const [selectedRace, setSelectedRace] = useState<RaceType | null>(null);
  const [races, setRaces] = useState<RaceType[]>([]);
  const [fullRaceSrc, setfullRaceSrc] = useState<string>('');
  const [flareRaceSrc, setFlareRaceSrc] = useState<string>('');

  const { getRaces } = useGetRaceCards();

  useEffect(() => {
    const newRaces = getRaces();
    setRaces(newRaces);
  }, [getRaces, player]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('go', selectedRace);
    if (state.gameState?.players && selectedRace) {
      dispatch({
        type: ActionTypes.SET_GAME_STATE,
        payload: {
          players: {
            ...state.gameState?.players,
            [player.name]: {
              ...state.gameState?.players?.[player.name],
              race: selectedRace,
            }
          },
        },
      });
    }
  }, [dispatch, player.name, selectedRace, state.gameState?.players]);

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

  console.log('state', state);

  return(
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title={<>Выберите расу для&nbsp;<span style={{ color: player.color}}>{player.name}</span></>}
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
                  <span className='selection-race-modal__race-name'>{race.name}</span>
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
        >Начать</Button>
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
