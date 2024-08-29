'use client';
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/firebase.config";
import { useStore } from '@/store';
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { DBCollectionsEnum } from "@/types/DatabaseTypes";
import { ActionTypes } from "./types";
import { LS_ITEM_GAME_ID } from "@/const";

type User = any;
type ContextState = { user: User };

const FirebaseContext = React.createContext<ContextState | undefined>(undefined);

const FirebaseProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const value = { user };
  const auth = getAuth(app);

  const { state, dispatch } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    // subscribe if there is a game ID
    const { gameId } = state.gameState;
    let unsubscribe: Unsubscribe = () => null;

    if (gameId) {
      unsubscribe = onSnapshot(doc(db, DBCollectionsEnum.Games, gameId), (doc) => {
        if (doc.exists()) {
          dispatch({
            type: ActionTypes.SET_GAME_STATE,
            payload: doc.data().gameState,
          });
          localStorage.setItem(LS_ITEM_GAME_ID, gameId);
        }
      });
    }
    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.gameState.gameId]);

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

function useFirebase() {
  const context = React.useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error(
      "useFirebase must be used within a FirebaseProvider"
    );
  }
  return context.user;
}

export { FirebaseProvider, useFirebase };