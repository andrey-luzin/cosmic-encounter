import { getRandomObjects } from "@/helpers";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/types";
import { useCallback, useEffect, useRef } from "react";

export const useGetRaceCards = () => {
  const { state, dispatch } = useStore();
  const shuffledArrayRef = useRef(state.decks.races);

  useEffect(() => {
    shuffledArrayRef.current = state.decks.races;
  }, [state.decks.races]);

  const getRaces = useCallback((count = 2) => {
    const shuffledArray = getRandomObjects([...shuffledArrayRef.current]);
    if (count > 0 && shuffledArray.length) {
      const selectedCards = shuffledArray.slice(0, count);
      dispatch({
        type: ActionTypes.SET_RACES_DECK,
        payload: shuffledArray.slice(count),
      });
      return selectedCards;
    }
    return [];
  }, [dispatch]);

  return { getRaces };
};