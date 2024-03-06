import { CosmicCardType } from "./CardTypes";
import { Phases } from "./PhaseTypes";
import { RaceType } from "./RacesTypes";

export type GameStateType = {
  playersCounts: number,
  players: {
    [playerName: string]: {
      color: string,
      race?: RaceType,
      planets: {
        id: number;
      }[],
      cards: CosmicCardType[],
    }
  },
  activePlayer: number,
  phase: Phases | null,
};
