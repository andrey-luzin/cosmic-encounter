import { useCallback, useState } from "react";
import { useGetCards } from "./useGetCards";

export const useGetRaceCards = () => {
  const fetchRaces = useGetCards('races');

  const [races, setRaces] = useState<any[]>([]);

  const getRaces = useCallback(async (count = 1) => {
    const races = await fetchRaces(count);
    setRaces(races);
  }, [fetchRaces]);

  return { races, getRaces };
};