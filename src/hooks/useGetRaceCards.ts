import { racesCards } from "@/data/races-cards";
import { getRandomObjects } from "@/helpers";
import { useCallback } from "react";

export const useGetRaceCards = () => {
  const getRaces = useCallback((count = 2) => {
    if (count > 0 && racesCards.length) {
      const shuffledArray = [...racesCards].filter(card => !card.isDisable);

      const shuffledObjects = getRandomObjects(shuffledArray);
      console.log('shuffledObjects', shuffledObjects);
      
      const selectedCards = shuffledObjects.slice(0, count);
      // TODO: shuffle remaing cards to deck in state
      // const remainingCards = shuffledArray.slice(count);
      return selectedCards;
    }
    return [];
  }, []);

  return { getRaces };
};