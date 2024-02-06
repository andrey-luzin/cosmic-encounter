'use client';
import { Button } from '@/components/FormComponents/Button';
import './index.scss';
import { Select } from '@/components/FormComponents/Select';

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

export default function NewGamePage () {
  return (
    <main className="game-settings">
      <h1 className="game-settings__title">Создание игры</h1>
      <Select options={playersCount} label="Количество игроков" />
      <Button>Создать игру</Button>
    </main>
  );
}