import { ConnectDropTarget } from 'react-dnd';

export const ItemTypes = {
  SPACESHIP: 'spaceship',
};

export type DropStateType = { canDrop: boolean, isOver: boolean, drop: ConnectDropTarget };

// export enum ItemTypes {
//   SPACESHIP = 'spaceship',
// };
