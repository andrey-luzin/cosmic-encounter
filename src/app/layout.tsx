import { Layout } from '@/components/Layout';
import { StoreProvider } from "@/store";
import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Cosmic Encounnter</title>
      </head>
      <body>
        <StoreProvider>
          <Layout>
            {children}
          </Layout>
        </StoreProvider>
      </body>
    </html>
  );
}
