import { useCallback, useState } from "react";
import { useGetCards } from "./useGetCards";
import { CardTypes } from "@/types/CardTypes";
import { RaceType } from "@/types/RacesTypes";

export const useGetRaceCards = () => {
  const fetchRaces = useGetCards(CardTypes.Races);

  const [races, setRaces] = useState<RaceType[]>([]);

  const getRaces = useCallback(async (count = 1) => {
    const races = await fetchRaces(count);
    setRaces(races);
  }, [fetchRaces]);

  return { races, getRaces };
};