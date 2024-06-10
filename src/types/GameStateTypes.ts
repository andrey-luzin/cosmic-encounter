import { Phases } from "./PhaseTypes";
import { PlayerType } from "./PlayerTypes";


export type GameStateType = {
  playersCounts: number,
  players: {
    [playerName: GameStateType['activePlayer']]: PlayerType
  },
  activePlayer: string,
  phase: Phases | null,
  gameIsStarted: boolean,
};