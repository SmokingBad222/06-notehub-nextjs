
import './globals.css';
import type { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';

export const metadata = {
  title: 'NoteHub',
  description: 'Notes app',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Для глобального layout ми не prefetch щось особливе.
  return (
    <html lang="en">
      <body>
        <Header />
        {/* TanStackProvider без dehydratedState — локальні сторінки підключатимуть свій prefetch */}
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
        <Footer />
      </body>
    </html>
  );
}


