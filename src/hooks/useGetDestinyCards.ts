import { useGetCards } from "./useGetCards";

export const useGetDestinyCards = () => {
  const getDestiny = useGetCards('destinyCards');

  return { getDestiny };
};
