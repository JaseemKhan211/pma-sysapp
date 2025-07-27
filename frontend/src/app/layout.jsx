import './globals.css';
import { ThemeProvider } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '600'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
        <body className="relative min-h-screen font-sans">
          {/* <Header /> */}
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
          </div>
          <ThemeToggle />
          {/* <Footer /> */}
        </body>
      </html>
    </ThemeProvider>
  );
}
