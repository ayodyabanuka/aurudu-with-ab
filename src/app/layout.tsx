import type { Metadata } from 'next';
import { Yaldevi } from 'next/font/google';
import './globals.css';

const sinhala = Yaldevi({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Aurudu With AB',
  description: '2025 අලුත් අවුරුදු නැකෑත්',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
      </head>
      <body className={`${sinhala.className}  antialiased`}>{children}</body>
    </html>
  );
}
