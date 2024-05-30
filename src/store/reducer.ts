import { AppState, Action, ActionTypes } from './types';

export const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.SET_SETTINGS:
      return { ...state, settings: action.payload };
    case ActionTypes.SET_GAMELOG_VISIBILITY:
      return { ...state, gameLogIsOpen: action.payload };
    case ActionTypes.SET_GAMELOG:
      return { ...state, gameLog: action.payload };
    case ActionTypes.INIT_LAYOUT:
      return { ...state, layoutRef: action.payload };
    case ActionTypes.SET_GAME_STATE:
      return { ...state, gameState: { ...state.gameState, ...action.payload} };
    case ActionTypes.RESET_GAME_STATE:
      return { ...state, gameState: {} };
    case ActionTypes.SET_RACES_DECK:
      return { ...state, decks: { races: action.payload } };
    default:
      return state;
  }
};