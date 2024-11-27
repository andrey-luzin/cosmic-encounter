import { CardTypes, CosmicCardType } from "@/types/CardTypes";
import { useGetCards } from "./useGetCards";
import { useCallback, useState } from "react";

export const useGetCosmicCards = () => {
  const  getCards = useGetCards(CardTypes.CosmicCards);

  return { getCards };
};

// export const useGetCosmicCards = () => {
//   const  fetchCosmicCards = useGetCards(CardTypes.CosmicCards);

//   const [cosmicCards, setCosmicCards] = useState<CosmicCardType[]>([]);

//   const getCosmicCards = useCallback(async (count = 1) => {
//     const cosmicCards = await fetchCosmicCards(count);
//     setCosmicCards(cosmicCards);
//   }, [fetchCosmicCards]);

//   return { cosmicCards, getCosmicCards };
// };
