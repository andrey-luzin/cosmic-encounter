import { db } from "@/firebase.config";
import { getRandomObjects } from "@/helpers";
import { useStore } from "@/store";
import { Action, ActionTypes } from "@/store/types";
import { DBCollectionsEnum } from "@/types/DatabaseTypes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MutableRefObject, useCallback } from "react";

export const useGetCards = (
  deckName: 'races' | 'cosmicCards' | 'destinyCards'
) => {
  const { state } = useStore();

  const { gameId } = state.gameState;

  const getCards = useCallback(async (count = 1) => {
    if (gameId) {
      const docRef = doc(db, DBCollectionsEnum.Games, gameId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {

        const deck = docSnap.data().decks[deckName];

        const shuffledArray = getRandomObjects([...deck]);
        if (count > 0 && shuffledArray.length) {
          const selectedCards = shuffledArray.slice(0, count);
          updateDoc(docRef, {
            [`decks.${deckName}`]: shuffledArray.slice(count)
          });
          return selectedCards;
        }
      }
    }

    return [];
  }, [gameId, deckName]);

  return getCards;
};
