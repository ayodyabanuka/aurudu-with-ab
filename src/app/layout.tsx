import type { Metadata } from 'next';
import { Noto_Sans_Sinhala } from 'next/font/google';
import './globals.css';

const sinhala = Noto_Sans_Sinhala({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
        <link rel='shortcut icon' href='/favicon.webp' type='image/x-icon' />
      </head>
      <body className={`${sinhala.className}  antialiased`}>{children}</body>
    </html>
  );
}
