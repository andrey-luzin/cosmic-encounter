import React, { FC, useCallback, useState } from 'react';
import { Modal, ModalProps } from '@/components/Modal';

import { Tabs } from '@/components/FormComponents/Tabs';

import { HotseatMode } from './hotseatMode';
import { SelectionRaceModal } from '../SelectionRaceModal';

import './index.scss';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({
  isVisible: newGameModalIsVisible,
  onClose,
}) => {
  const [raceSelectionModalIsVisible, setRaceSelectionModalIsVisible] = useState<boolean>(false);

  const handleShowRaceSelection = useCallback(() => {
    setRaceSelectionModalIsVisible(true);
    onClose();
  }, [onClose]);

  return(
    <>
      <Modal
        isVisible={newGameModalIsVisible}
        onClose={onClose}
        title='Новая игра'
        className='new-game-modal'
      >
        <div className="new-game-modal__inner">
          <Tabs>
            <Tabs.Panel title='Хотсит'>
              <HotseatMode onCallback={handleShowRaceSelection} />
            </Tabs.Panel>
            <Tabs.Panel title='Новая игра' disabled />
            <Tabs.Panel title='Присоединиться к игре' disabled />
          </Tabs>
        </div>
      </Modal>
      <SelectionRaceModal 
        isVisible={raceSelectionModalIsVisible}
        onClose={() => setRaceSelectionModalIsVisible(false)}
      />
    </>
  );
};
