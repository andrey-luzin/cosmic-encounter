import { nanoid } from "nanoid";
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
  gameId: ReturnType<typeof nanoid>;
};