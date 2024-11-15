import { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, arrayUnion, updateDoc, Timestamp, DocumentData, DocumentReference } from "firebase/firestore"; 

import { db } from "@/firebase.config";
import { useStore } from '@/store';
import { DBCollectionsEnum } from '@/types/DatabaseTypes';

export const useGameLog = () => {
  const { state } = useStore();
  const [docRef, setDocRef] = useState<DocumentReference<DocumentData, DocumentData>>();

  useEffect(() => {
    const gameId = state.gameState.gameId;
    const getDocRef = () => {
      if (gameId) {
        const ref = doc(db, DBCollectionsEnum.Games, gameId);
        setDocRef(ref);
      }
    };

    if (!docRef) {
      getDocRef();
    }
  }, [docRef, state.gameState.gameId]);

  const addToLog = useCallback(async (message: string): Promise<void> => {
    if (docRef) {
      const timestamp = Timestamp.fromDate(new Date());

      await updateDoc(docRef, {
        gameLog: arrayUnion({ timestamp, message })
      });
    }
  }, [docRef]);

  const gameLog = useMemo(() => {
    return state.gameLog;
  }, [state.gameLog]);

  return { addToLog, gameLog };
};
