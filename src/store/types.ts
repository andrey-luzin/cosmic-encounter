import { RefObject } from "react";

interface SettingsState {
  animation: boolean,
}

type LayoutState = RefObject<Element> | null;

export interface AppState {
  settings: SettingsState;
  layoutRef: LayoutState
}

export enum ActionTypes {
  SET_SETTINGS ='SET_SETTINGS',
  INIT_LAYOUT ='INIT_LAYOUT',
}

export type Action = 
  | { type: ActionTypes.SET_SETTINGS; payload: SettingsState }
  | { type: ActionTypes.INIT_LAYOUT; payload: LayoutState };
