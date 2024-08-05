'use client';
import React, { PropsWithChildren, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/firebase.config";

type User = any;
type ContextState = { user: User };

const FirebaseAuthContext = React.createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const value = { user };
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

function useFirebaseAuth() {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context.user;
}

export { FirebaseAuthProvider, useFirebaseAuth };