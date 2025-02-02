import { ThemeProvider } from '@/context/Theme';
import { cn } from '@/utils/cn';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const montserrat = Inter({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Карта Українських Карпат',
  description: 'Путівник Українськими Карпатами. Карта, маршрути, проживання, музеї, водоспади, річки, озера.',
  icons: {
    icon: `${process.env.NEXT_PUBLIC_FOLDER}icon.png`
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', montserrat.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

export const runtime = 'edge';
