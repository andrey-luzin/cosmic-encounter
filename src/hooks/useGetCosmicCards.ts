import { cosmicCards } from "@/data/cosmic-cards";
import { getRandomObjects } from "@/helpers";
import { useCallback } from "react";

export const useGetCosmicCards = () => {
  const getCards = useCallback((count: number) => {
    if (count > 0 && cosmicCards.length) {
      const shuffledArray = [...cosmicCards];

      const shuffledObjects = getRandomObjects(shuffledArray);
    
      const selectedCards = shuffledObjects.slice(0, count);
      // TODO: shuffle remaing cards to deck in state
      // const remainingCard = shuffledArray.slice(count);
      return selectedCards;
    }
    return [];
  }, []);

  return { getCards };
};