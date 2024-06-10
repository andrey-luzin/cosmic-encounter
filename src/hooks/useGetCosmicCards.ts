import { useStore } from "@/store";
import { ActionTypes } from "@/store/types";
import { useEffect, useRef } from "react";
import { useGetCards } from "./useGetCards";

export const useGetCosmicCards = () => {
  const { state } = useStore();
  const shuffledArrayRef = useRef(state.decks.cosmicCards);

  useEffect(() => {
    shuffledArrayRef.current = state.decks.cosmicCards;
  }, [state.decks.cosmicCards]);

  const  getCards = useGetCards(shuffledArrayRef, ActionTypes.SET_COSMIC_DECK);

  return { getCards };
};
