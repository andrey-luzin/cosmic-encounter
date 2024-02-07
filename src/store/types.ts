import { GameLogItem } from "@/types/GameLog";
import { RefObject } from "react";

interface SettingsState {
  animation: boolean,
}

type LayoutState = RefObject<Element> | null;

export interface AppState {
  settings: SettingsState;
  layoutRef: LayoutState;
  gameLogIsOpen: boolean
  gameLog: GameLogItem[];
}

export enum ActionTypes {
  SET_SETTINGS ='SET_SETTINGS',
  SET_GAMELOG_VISIBILITY ='SET_GAMELOG_VISIBILITY',
  SET_GAMELOG ='SET_GAMELOG',
  INIT_LAYOUT ='INIT_LAYOUT',
}

export type Action = 
  | { type: ActionTypes.SET_SETTINGS; payload: SettingsState }
  | { type: ActionTypes.SET_GAMELOG_VISIBILITY; payload: boolean }
  | { type: ActionTypes.SET_GAMELOG; payload: GameLogItem[] }
  | { type: ActionTypes.INIT_LAYOUT; payload: LayoutState };
