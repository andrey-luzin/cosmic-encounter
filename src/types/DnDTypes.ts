import { ConnectDropTarget } from 'react-dnd';

export type DropStateType = { canDrop: boolean, isOver: boolean, drop: ConnectDropTarget };

export enum ItemTypes {
  SPACESHIP = 'spaceship',
};
