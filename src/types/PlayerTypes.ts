import { CosmicCardType } from "./CardTypes";
import { RaceType } from "./RacesTypes";

export enum PlayerColor {
  Yellow = '#ffb300',
  Blue = '#1717ee',
  Red = 'red',
  Green = '#0b0',
  Purple = '#a405a4',
}

export type PlayerType = {
  name: string,
  color: PlayerColor,
  race?: RaceType,
  planets?: {
    id: number;
  }[],
  cards?: CosmicCardType[],
  turnOrder: number,
};