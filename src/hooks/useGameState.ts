import { useStore } from "@/store";
import { useCallback } from "react";
import { useGameLog } from "./useGameLog";
import { ActionTypes } from "@/store/types";
import { useGetCosmicCards } from "./useGetCosmicCards";
import { RaceType } from "@/types/RacesTypes";
import { PlayerType } from "@/types/PlayerTypes";
import { Phases } from "@/types/PhaseTypes";

export const useGameState = () => {
  const { state, dispatch } = useStore();
  const { addToLog } = useGameLog();
  const { getCards } = useGetCosmicCards();
  
  const selectRace = useCallback(({ player, selectedRace }: {
    player: Pick<PlayerType, "name" | "color">,
    selectedRace: RaceType | null
  }) => {
    if (state.gameState?.players && selectedRace) {
      dispatch({
        type: ActionTypes.SET_GAME_STATE,
        payload: {
          players: {
            ...state.gameState?.players,
            [player.name]: {
              ...state.gameState?.players?.[player.name],
              race: selectedRace,
              cards: getCards(8)
            },
          },
        },
      });
      addToLog(`<span style="color: ${player.color}">${player.name}</span> выбрал расу <b>${selectedRace.name}</b>`);
    }
  }, [addToLog, dispatch, getCards, state.gameState?.players]);

  const startGame = useCallback((players?: { [playerName: string]: PlayerType; }) => {
    if (players) {
      const playersList = Object.values(players);
      if (
        playersList.every(player => player.race) &&
        playersList.length === state.gameState.playersCounts
      ) {
        dispatch({
          type: ActionTypes.SET_GAME_STATE,
          payload: {
            activePlayer: playersList.find(player => player.turnOrder === 0)?.name,
            phase: Phases.StartingTheTurn,
          },
        });
      }
    }
  }, [dispatch, state.gameState.playersCounts]);

  return { selectRace, startGame };
};
