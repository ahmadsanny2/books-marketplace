import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Book Store - Marketplace Buku Terlengkap',
  description: 'Temukan dan beli buku favorit Anda dari koleksi terlengkap dengan harga terbaik',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
