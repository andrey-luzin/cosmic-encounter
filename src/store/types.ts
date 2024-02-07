import { RefObject } from "react";

interface SettingsState {
  animation: boolean,
}

type LayoutState = RefObject<Element> | null;

interface GameLogState {
  logIsOpen: boolean;
}

export interface AppState {
  settings: SettingsState;
  layoutRef: LayoutState;
  gameLog: GameLogState;
}

export enum ActionTypes {
  SET_SETTINGS ='SET_SETTINGS',
  SET_GAMELOG ='SET_GAMELOG',
  INIT_LAYOUT ='INIT_LAYOUT',
}

export type Action = 
  | { type: ActionTypes.SET_SETTINGS; payload: SettingsState }
  | { type: ActionTypes.SET_GAMELOG; payload: GameLogState }
  | { type: ActionTypes.INIT_LAYOUT; payload: LayoutState };
