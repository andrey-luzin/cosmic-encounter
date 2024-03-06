import { ISelectOption } from '@/components/FormComponents/Select';
import { PlayerColor } from '@/types/PlayerTypes';

export const playersOptions: ISelectOption[] = [
  {
    value: PlayerColor.Yellow,
    label: 'Желтый',
    color: PlayerColor.Yellow,
  },
  {
    value: PlayerColor.Blue,
    label: 'Синий',
    color: PlayerColor.Blue,
  },
  {
    value: PlayerColor.Red,
    label: 'Красный',
    color: PlayerColor.Red,
  },
  {
    value: PlayerColor.Green,
    label: 'Зеленый',
    color: PlayerColor.Green,
  },
  {
    value: PlayerColor.Purple,
    label: 'Пурпурный',
    color: PlayerColor.Purple,
  }
];