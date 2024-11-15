import { nanoid } from "nanoid";
import { Timestamp } from "firebase/firestore";

import { Phases } from "./PhaseTypes";
import { PlayerType } from "./PlayerTypes";

export type GameStateType = {
  playersCount: number,
  players: {
    [playerName: GameStateType['activePlayer']]: PlayerType
  },
  activePlayer: string,
  phase: Phases | null,
  gameIsStarted: boolean,
  prepareIsStarted: boolean,
  gameId: ReturnType<typeof nanoid>;
  createdAt: string | Timestamp;
};