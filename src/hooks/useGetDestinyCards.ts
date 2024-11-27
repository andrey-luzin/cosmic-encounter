import { CardTypes } from "@/types/CardTypes";
import { useGetCards } from "./useGetCards";

export const useGetDestinyCards = () => {
  const getDestiny = useGetCards(CardTypes.DestinyCards);

  return { getDestiny };
};
