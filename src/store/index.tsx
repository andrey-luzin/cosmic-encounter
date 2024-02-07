"use client";
import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { AppState, Action } from './types';
import { reducer } from './reducer';

const initialState: AppState = {
  settings: {
    animation: false,
  },
  layoutRef: null,
  gameLog: {
    logIsOpen: false,
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

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
