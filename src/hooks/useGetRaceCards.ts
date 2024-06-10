import { useStore } from "@/store";
import { ActionTypes } from "@/store/types";
import { useEffect, useRef } from "react";
import { useGetCards } from "./useGetCards";

export const useGetRaceCards = () => {
  const { state } = useStore();
  const shuffledArrayRef = useRef(state.decks.races);

  useEffect(() => {
    shuffledArrayRef.current = state.decks.races;
  }, [state.decks.races]);

  const getRaces = useGetCards(shuffledArrayRef, ActionTypes.SET_RACES_DECK);

  return { getRaces };
};