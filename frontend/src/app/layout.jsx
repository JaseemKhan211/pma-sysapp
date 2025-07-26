import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white transition-colors">
        <div className="min-h-screen flex flex-col justify-between">
          {/* <Header /> */}
          <main className="flex-grow">
            {children}
          </main>

          <footer className="w-full flex justify-center py-4 bg-transparent">
            <ThemeToggle />
          </footer>

          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
