import { Phases } from "./PhaseTypes";
import { PlayerType } from "./PlayerTypes";


export type GameStateType = {
  playersCounts: number,
  players: {
    [playerName: string]: PlayerType
  },
  activePlayer: number,
  phase: Phases | null,
  gameIsStarted: boolean,
};