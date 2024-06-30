import { useStore } from "@/store";
import { ActionTypes } from "@/store/types";
import { useEffect, useRef } from "react";
import { useGetCards } from "./useGetCards";
import { DestinyCardEnum } from "@/types/CardTypes";

export const useGetDestinyCards = () => {
  const { state } = useStore();
  const shuffledArrayRef = useRef(state.decks.destinyCards);

  useEffect(() => {
    shuffledArrayRef.current = state.decks.destinyCards;
  }, [state.decks.destinyCards]);

  console.log('destnity', shuffledArrayRef);
  

  const  getDestinies = useGetCards(shuffledArrayRef, ActionTypes.SET_DESTINY_DECK);

  return { getDestinies };
};
