"use client";
import React, { createContext, useContext, useReducer, ReactNode, Dispatch, useEffect, useRef } from 'react';
import { AppState, Action, ActionTypes } from './types';
import { reducer } from './reducer';

export const initialState: AppState = {
  settings: {
    animation: false,
    musicIsOn: false,
    volume: 0.3,
    language: 'en',
  },
  layoutRef: null,
  gameLogIsOpen: false,
  gameLog: [],
  gameState: {},
  currentPlayer: null,
  decks: {
    cosmicCards: [],
    destinyCards: [],
    races: []
  }
};

type StoreContextType = {
  state: AppState;
  dispatch: Dispatch<Action>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  const didInitLang = useRef(false);
  useEffect(() => {
    if (didInitLang.current) return;
    didInitLang.current = true;
    if (typeof navigator !== 'undefined') {
      const sysLang = navigator.language?.slice(0, 2).toLowerCase();
      const language = ['ru', 'en'].includes(sysLang) ? sysLang : 'en';
      if (state.settings.language !== language) {
        dispatch({ type: ActionTypes.SET_SETTINGS, payload: { ...state.settings, language } });
      }
    }
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
