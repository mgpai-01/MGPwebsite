'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { en, type Dictionary } from './dictionaries/en'
import { es } from './dictionaries/es'
import { zh } from './dictionaries/zh'

export type Locale = 'en' | 'es' | 'zh'

export const LOCALES: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'EN' },
  { code: 'es', label: 'Español', nativeLabel: 'ES' },
  { code: 'zh', label: '中文', nativeLabel: '中文' },
]

const dictionaries: Record<Locale, Dictionary> = { en, es, zh }

const STORAGE_KEY = 'mgp-locale'

type Ctx = {
  locale: Locale
  t: Dictionary
  setLocale: (l: Locale) => void
}

const LanguageContext = createContext<Ctx | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) as Locale | null
    if (stored && stored in dictionaries) setLocaleState(stored)
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = locale
  }, [locale])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {}
  }

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useT() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useT must be used inside LanguageProvider')
  return ctx
}

// Inline script run before hydration to set <html lang> from storage,
// preventing a flash of English on first paint.
export const HtmlLangScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(function(){try{var l=localStorage.getItem('${STORAGE_KEY}');if(l==='en'||l==='es'||l==='zh'){document.documentElement.lang=l;}}catch(e){}})();`,
    }}
  />
)
