import { db } from "@/firebase.config";
import { getRandomObjects } from "@/helpers";
import { useStore } from "@/store";
import { CardTypes } from "@/types/CardTypes";
import { DBCollectionsEnum } from "@/types/DatabaseTypes";
import { doc, runTransaction } from "firebase/firestore";
import { useCallback } from "react";

export const useGetCards = (deckName: CardTypes) => {
  const { state } = useStore();

  const { gameId } = state.gameState;

  const getCards = useCallback(async (count = 1) => {
    if (gameId) {
      const docRef = doc(db, DBCollectionsEnum.Games, gameId);
     
      try {
        const selectedCards = await runTransaction(db, async (transaction) => {
          const docSnap = await transaction.get(docRef);

          if (!docSnap.exists()) {
            throw new Error("The document does not exist");
          }

          const gameData = docSnap.data();
          const deck = gameData.decks[deckName];

          const shuffledArray = getRandomObjects([...deck]);
          const selectedCards = shuffledArray.slice(0, count);

          // TODO: add shuffle discards card
          if (count > 0 && shuffledArray.length) {
            // FIXME: check this
            transaction.update(docRef, {
              [`decks.${deckName}`]: shuffledArray.slice(count),
            });
            return selectedCards;
          }

          return [];
        });

        return selectedCards;
      } catch (error) {
        console.error("Error executing transaction:", error);
        return [];
      }
    }

    return [];
  }, [gameId, deckName]);

  return getCards;
};
