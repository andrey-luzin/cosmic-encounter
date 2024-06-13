import { useCallback, useMemo } from 'react';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

export const useGameLog = () => {
  const { state, dispatch } = useStore();

  const addToLog = useCallback((message: string): void => {
    const log = state.gameLog;
    const timestamp = new Date().toISOString();
    log.push({ timestamp, message });

    dispatch({
      type: ActionTypes.SET_GAMELOG,
      payload: log,
    });
  }, [dispatch, state.gameLog]);

  const gameLog = useMemo(() => {
    return state.gameLog;
  }, [state.gameLog]);

  return { addToLog, gameLog };
};
