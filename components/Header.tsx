'use client'

import { useEffect, useRef, useState } from 'react'
import { LOCALES, useT, type Locale } from '@/lib/i18n'
import { fadeNavigate } from '@/lib/pageTransition'

export default function Header() {
  const { t, locale, setLocale } = useT()
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: '/#products', label: t.nav.products },
    { href: '/#industries', label: t.nav.industries },
    { href: '/#sustainability', label: t.nav.sustainability },
    { href: '/#about', label: t.nav.about },
    { href: '/#locations', label: t.nav.locations },
    { href: '/#faq', label: t.nav.faq },
    { href: '/schedule', label: t.nav.schedule },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!langOpen) return
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  const pick = (l: Locale) => { setLocale(l); setLangOpen(false) }
  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]

  // Shared with in-page links (e.g. the Kirk page's "back to home") so every
  // cross-page navigation fades out the same way. See lib/pageTransition.
  const navigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) =>
    fadeNavigate(e, href, () => setOpen(false))

  return (
    <header className="fixed top-0 left-0 w-full bg-surface/95 backdrop-blur-sm z-50 border-b-2 border-outline-variant">
      <div className="flex justify-between items-center px-gutter py-stack-sm">
        <a href="/" className="flex items-center gap-3 no-underline" onClick={(e) => navigate(e, '/')}>
          <img src="/logo.png" alt="Manufacturing Green Products" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <div className="leading-[1.02] hidden sm:block">
            <div className="font-headline-md font-black text-on-surface text-base tracking-[-0.01em]">Manufacturing</div>
            <div className="font-headline-md font-black text-primary text-base tracking-[-0.01em]">Green Products</div>
          </div>
        </a>

        <nav className="hidden md:flex gap-stack-md">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => navigate(e, l.href)} className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
              aria-label={t.nav.languageLabel}
              className="flex items-center gap-1.5 px-3 py-2 border border-outline-variant hover:border-primary text-on-surface-variant hover:text-primary transition-colors font-label-caps text-[12px] uppercase tracking-wider"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span>{current.nativeLabel}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {langOpen && (
              <div role="menu" className="absolute right-0 mt-1 min-w-[140px] bg-surface border border-outline-variant shadow-lg overflow-hidden">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    role="menuitem"
                    onClick={() => pick(l.code)}
                    className={`w-full text-left px-4 py-2.5 font-body-md text-[14px] transition-colors hover:bg-surface-container ${l.code === locale ? 'text-primary font-bold bg-surface-container-low' : 'text-on-surface'}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="/#quote" onClick={(e) => navigate(e, '/#quote')} className="hidden sm:inline-block bg-primary text-on-primary font-label-caps text-label-caps px-stack-md py-stack-sm uppercase hover:bg-primary-container transition-colors no-underline">{t.nav.cta}</a>
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-on-surface"
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-outline-variant bg-surface">
          <nav className="flex flex-col px-gutter py-4 gap-1">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => navigate(e, l.href)} className="font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium py-3 border-b border-outline-variant/40 last:border-b-0 hover:text-primary">{l.label}</a>
            ))}
            <a href="/#quote" onClick={(e) => navigate(e, '/#quote')} className="mt-2 bg-primary text-on-primary text-center font-label-caps text-label-caps px-stack-md py-stack-sm uppercase hover:bg-primary-container transition-colors no-underline">{t.nav.cta}</a>
          </nav>
        </div>
      )}
    </header>
  )
}
