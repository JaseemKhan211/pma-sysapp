'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Laptop2 } from 'lucide-react'

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md flex gap-2 items-center">
      <button onClick={() => setTheme('light')} className={`p-1 rounded hover:bg-gray-200 ${theme === 'light' ? 'bg-gray-300' : ''}`}>
        <Sun size={20} />
      </button>
      <button onClick={() => setTheme('dark')} className={`p-1 rounded hover:bg-gray-200 ${theme === 'dark' ? 'bg-gray-600 text-white' : ''}`}>
        <Moon size={20} />
      </button>
      <button onClick={() => setTheme('system')} className={`p-1 rounded hover:bg-gray-200 ${theme === 'system' ? 'bg-gray-300' : ''}`}>
        <Laptop2 size={20} />
      </button>
    </div>
  )
}
