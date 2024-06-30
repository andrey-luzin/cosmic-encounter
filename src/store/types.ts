import { CosmicCardType, DestinyCardType } from "@/types/CardTypes";
import { GameLogItem } from "@/types/GameLog";
import { GameStateType } from "@/types/GameStateTypes";
import { RaceType } from "@/types/RacesTypes";
import { RefObject } from "react";

interface SettingsState {
  animation: boolean,
  musicIsOn: boolean,
  musicSongIndex?: number,
  volume: number,
}

type LayoutState = RefObject<Element> | null;

export interface AppState {
  settings: SettingsState;
  layoutRef: LayoutState;
  gameLogIsOpen: boolean
  gameLog: GameLogItem[];
  gameState: Partial<GameStateType>;
  decks: {
   races: RaceType[],
   cosmicCards: CosmicCardType[]
   destinyCards: DestinyCardType[]
  }
}

export enum ActionTypes {
  SET_SETTINGS = 'SET_SETTINGS',
  SET_GAMELOG_VISIBILITY = 'SET_GAMELOG_VISIBILITY',
  SET_GAMELOG = 'SET_GAMELOG',
  INIT_LAYOUT = 'INIT_LAYOUT',
  SET_GAME_STATE = 'SET_GAME_STATE',
  RESET_GAME_STATE = 'RESET_GAME_STATE',
  SET_RACES_DECK = 'SET_RACES_DECK',
  SET_COSMIC_DECK = 'SET_COSMIC_DECK',
  SET_DESTINY_DECK = 'SET_DESTINY_DECK',
}

export type Action = 
  | { type: ActionTypes.SET_SETTINGS; payload: SettingsState }
  | { type: ActionTypes.SET_GAMELOG_VISIBILITY; payload: boolean }
  | { type: ActionTypes.SET_GAMELOG; payload: GameLogItem[] }
  | { type: ActionTypes.INIT_LAYOUT; payload: LayoutState }
  | { type: ActionTypes.SET_GAME_STATE; payload: Partial<GameStateType> }
  | { type: ActionTypes.RESET_GAME_STATE }
  | { type: ActionTypes.SET_RACES_DECK; payload: RaceType[] }
  | { type: ActionTypes.SET_COSMIC_DECK; payload: CosmicCardType[] }
  | { type: ActionTypes.SET_DESTINY_DECK; payload: DestinyCardType[] };

