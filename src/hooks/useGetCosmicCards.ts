import { CardTypes, CosmicCardType } from "@/types/CardTypes";
import { useGetCards } from "./useGetCards";
import { useState, useCallback } from "react";

export const useGetCosmicCards = () => {
  const fetchCosmicCards = useGetCards(CardTypes.CosmicCards);

  const [cosmicCards, setCosmicCards] = useState<CosmicCardType[]>([]);

  const getCosmicCards = useCallback(async (count = 1) => {
    const cosmicCards = await fetchCosmicCards(count);
    setCosmicCards(cosmicCards);
    // setPlayerCosmicHand()
  }, [fetchCosmicCards]);

  return { cosmicCards, getCosmicCards };
};
