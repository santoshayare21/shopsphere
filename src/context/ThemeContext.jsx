import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { loadJSON, saveJSON } from '@/utils/storage'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'theme'

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = loadJSON(STORAGE_KEY, null)
    return saved === 'light' || saved === 'dark' ? saved : getSystemTheme()
  })

  useEffect(() => {
    applyTheme(theme)
    saveJSON(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const saved = loadJSON(STORAGE_KEY, null)
    if (saved) return undefined
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setThemeState(getSystemTheme())
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const setTheme = useCallback((next) => {
    setThemeState(next === 'dark' ? 'dark' : 'light')
  }, [])

  // Memoize context value to avoid re-rendering all consumers on unrelated updates.
  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      isDark: theme === 'dark',
    }),
    [theme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
