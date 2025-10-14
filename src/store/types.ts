import { CosmicCardType, DestinyCardType } from "@/types/CardTypes";
import { GameLogItem } from "@/types/GameLog";
import { GameStateType } from "@/types/GameStateTypes";
import { PlayerType } from "@/types/PlayerTypes";
import { RaceType } from "@/types/RacesTypes";
import { RefObject } from "react";

interface SettingsState {
  animation: boolean,
  musicIsOn: boolean,
  musicSongIndex?: number,
  volume: number,
  language: string,
}

type LayoutState = RefObject<Element> | null;

export interface AppState {
  settings: SettingsState;
  layoutRef: LayoutState;
  gameLogIsOpen: boolean
  gameLog: GameLogItem[];
  gameState: Partial<GameStateType>;
  currentPlayer: PlayerType | null;
  decks: Partial<{
    cosmicCards: CosmicCardType[],
    destinyCards: DestinyCardType[],
    races: RaceType[]
  }>
}

export enum ActionTypes {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_GAMELOG_VISIBILITY = 'SET_GAMELOG_VISIBILITY',
  SET_GAMELOG = 'SET_GAMELOG',
  INIT_LAYOUT = 'INIT_LAYOUT',
  SET_GAME_STATE = 'SET_GAME_STATE',
  RESET_GAME_STATE = 'RESET_GAME_STATE',
  SET_CURRENTLY_PLAYER = 'SET_CURRENTLY_PLAYER',
  SET_DECKS = 'SET_DECKS',
}

export type Action = 
  | { type: ActionTypes.SET_SETTINGS; payload: SettingsState }
  | { type: ActionTypes.SET_GAMELOG_VISIBILITY; payload: boolean }
  | { type: ActionTypes.SET_GAMELOG; payload: GameLogItem[] }
  | { type: ActionTypes.INIT_LAYOUT; payload: LayoutState }
  | { type: ActionTypes.SET_GAME_STATE; payload: Partial<GameStateType> }
  | { type: ActionTypes.SET_DECKS; payload: Partial<AppState['decks']> }
  | { type: ActionTypes.RESET_GAME_STATE }
  | { type: ActionTypes.SET_CURRENTLY_PLAYER; payload: PlayerType };
