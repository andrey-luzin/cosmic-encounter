import { StoreProvider } from "@/store";
import { FirebaseProvider } from "@/store/firebase";

import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Cosmic Encounnter</title>
      </head>
      <body>
        <StoreProvider>
          <FirebaseProvider>
            {children}
          </FirebaseProvider>
        </StoreProvider>
        </body>
    </html>
  );
}
