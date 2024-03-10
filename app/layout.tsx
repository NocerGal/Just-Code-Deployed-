// app/layout.tsx
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { SiteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren, ReactNode } from 'react';
import { Providers } from './Providers';
import './globals.css';
import './code.css';

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({
  children,
  modal,
}: PropsWithChildren<{ modal?: ReactNode }>) {
  return (
    <>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body
          className={cn(
            'h-full bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <div className="flex h-full flex-1 justify-center">
                <div className="flex w-full">{children}</div>
              </div>
              <Footer />
            </div>
            <TailwindIndicator />
            {modal}
          </Providers>
        </body>
      </html>
    </>
  );
}
