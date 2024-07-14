import { getRandomObjects } from "@/helpers";
import { useStore } from "@/store";
import { Action, ActionTypes } from "@/store/types";
import { MutableRefObject, useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGetCards = (arrayRef: MutableRefObject<any[]>, actionType: ActionTypes) => {
  const { dispatch } = useStore();

  const getCards = useCallback((count = 1) => {
    const shuffledArray = getRandomObjects([...arrayRef.current]);
    if (count > 0 && shuffledArray.length) {
      const selectedCards = shuffledArray.slice(0, count);
      dispatch({
        type: actionType,
        payload: shuffledArray.slice(count),
      } as Action);
      return selectedCards;
    }
    return [];
  }, [dispatch, arrayRef, actionType]);

  return getCards;
};
