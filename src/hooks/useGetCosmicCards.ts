import { useGetCards } from "./useGetCards";

export const useGetCosmicCards = () => {
  const  getCards = useGetCards('cosmicCards');

  return { getCards };
};
