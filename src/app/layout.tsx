import { StoreProvider } from "@/store";
import { FirebaseAuthProvider } from "@/store/firebase";

import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Cosmic Encounnter</title>
      </head>
      <body>
        <FirebaseAuthProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </FirebaseAuthProvider>
      </body>
    </html>
  );
}
