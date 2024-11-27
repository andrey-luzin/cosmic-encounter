import { useStore } from "@/store";
import { useCallback, useEffect, useState } from "react";
import { useGameLog } from "./useGameLog";
import { ActionTypes } from "@/store/types";
import { RaceType } from "@/types/RacesTypes";
import { PlayerType } from "@/types/PlayerTypes";
import { Phases } from "@/types/PhaseTypes";
import { destinyCards } from "@/data/destiny-cards";
import { DestinyCardEnum } from "@/types/CardTypes";
import { db } from "@/firebase.config";
import { DBCollectionsEnum } from "@/types/DatabaseTypes";
import { deleteDoc, doc, DocumentData, DocumentReference, DocumentSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { LS_ITEM_GAME_ID, LS_ITEM_GAME_NICK } from "@/const";

export const useGameState = () => {
  const { state, dispatch } = useStore();
  const { addToLog } = useGameLog();
  const [docRef, setDocRef] = useState<DocumentReference<DocumentData, DocumentData>>();
  const [docSnap, setDocSnap] = useState<DocumentSnapshot<DocumentData, DocumentData>>();

  useEffect(() => {
    const gameId = state.gameState.gameId;
    const getDocSnap = async () => {
      if (gameId) {
        const ref = doc(db, DBCollectionsEnum.Games, gameId);
        setDocRef(ref);
        setDocSnap(await getDoc(ref));
      }
    };
    if (!docSnap) {
      getDocSnap();
    }
  }, [docSnap, state.gameState.gameId]);

  const selectRace = useCallback(async ({ player, selectedRace }: {
    player: Pick<PlayerType, "name" | "color">,
    selectedRace: RaceType | null
  }) => {
    if (selectedRace && state.currentPlayer && docRef && docSnap?.exists()) {
      const { currentPlayer } = state;

      dispatch({
        type: ActionTypes.SET_CURRENTLY_PLAYER,
        payload: {
          ...currentPlayer,
          race: selectedRace,
        },
      });
      
      await updateDoc(docRef, {
        [`gameState.players.${currentPlayer.name}`]: {
          ...currentPlayer,
          race: selectedRace
        },
      });
      addToLog(
        `<span style="color: ${player.color}">${player.name}</span> выбрал расу <b>${selectedRace.name}</b>`
      );
    }
  }, [addToLog, dispatch, docRef, docSnap, state]);

  const startGame = useCallback(async (players?: { [playerName: string]: PlayerType; }) => {
    if (players) {
      const playersList = Object.values(players);

      if (
        playersList.every(player => player.race) &&
        playersList.length === state.gameState.playersCount &&
        docRef &&
        !state.gameState.gameIsStarted
      ) {
        await updateDoc(docRef, {
          'gameState.gameIsStarted': true,
          'gameState.activePlayer': playersList.find(player => player.turnOrder === 0)?.name,
          'gameState.phase': Phases.StartingTheTurn,
          'decks.destinyCards': destinyCards.filter((card) => {
            if (
              card.type === DestinyCardEnum.SpecialCard ||
              card.type === DestinyCardEnum.Joker ||
              playersList.map(list => list.color).includes(card.color)
            ) {
              return card;
            }
          })
        });
      }
    }
  }, [docRef, state.gameState.playersCount, state.gameState.gameIsStarted]);

  const deleteGame = useCallback(async () => {
    const gameId = state.gameState.gameId;
    const id = gameId || (localStorage.getItem(LS_ITEM_GAME_ID) as string);

    await deleteDoc(doc(db, DBCollectionsEnum.Games, id)).then(() => {
      dispatch({
        type: ActionTypes.RESET_GAME_STATE,
      });
      localStorage.removeItem(LS_ITEM_GAME_ID);
      localStorage.removeItem(LS_ITEM_GAME_NICK);
    });
  }, [dispatch, state.gameState.gameId]);

  return { selectRace, startGame, deleteGame };
};
