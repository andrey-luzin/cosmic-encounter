import React, { FC } from 'react';
import { Modal, ModalProps } from '@/components/Modal';

import './index.scss';
import { Tabs } from '@/components/FormComponents/Tabs';

import { HotseatMode } from './hotseatMode';

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({ isVisible, onClose }) => {
  return(
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title='Новая игра'
      className='new-game-modal'
    >
      <div className="new-game-modal__inner">
        <Tabs>
          <Tabs.Panel title='Хотсит'>
            <HotseatMode />
          </Tabs.Panel>
          <Tabs.Panel title='Новая игра' disabled />
          <Tabs.Panel title='Присоединиться к игре' disabled />
        </Tabs>
      </div>
    </Modal>
  );
};
