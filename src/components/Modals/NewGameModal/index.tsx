import React, { FC } from 'react';
import { Modal, ModalProps } from '@/components/Modal';

import './index.scss';
import { Tabs } from '@/components/FormComponents/Tabs';
import { Select } from '@/components/FormComponents/Select';
import { Button } from '@/components/FormComponents/Button';
import { Input } from '@/components/FormComponents/Input';

const playersCount = [
  {
    value: 3,
    label: 'Красный',
    color: 'red'
  },
  {
    value: 4,
    label: 'Желтый',
    color: 'yellow'
  }
];

type NewGameModalProps = Pick<ModalProps, 'isVisible' | 'onClose'>;

export const NewGameModal: FC<NewGameModalProps> = ({ isVisible, onClose }) => {
  const handleHotseatStart = () => {
    console.log('start');
  };

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
            <div className='new-game-modal__fields-group'>
              <Select options={playersCount} label="Цвет игрока" />
              <Input label='Имя игрока' />
            </div>
            <Button onClick={handleHotseatStart}>Начать игру</Button>
          </Tabs.Panel>
          <Tabs.Panel title='Новая игра' disabled />
          <Tabs.Panel title='Присоединиться к игре' disabled />
        </Tabs>
      </div>
    </Modal>
  );
};
