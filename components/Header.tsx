'use client'

import { useState, useEffect } from 'react'

const links = [
  { href: '#products', label: 'Products' },
  { href: '#industries', label: 'Industries' },
  { href: '#sustainability', label: 'Sustainability' },
  { href: '#about', label: 'About' },
  { href: '#locations', label: 'Locations' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header className="fixed top-0 left-0 w-full bg-surface/95 backdrop-blur-sm z-50 border-b-2 border-outline-variant">
      <div className="flex justify-between items-center px-gutter py-stack-sm">
        <a href="#" className="flex items-center gap-3 no-underline" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Manufacturing Green Products" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
          <div className="leading-tight hidden sm:block">
            <div className="font-headline-md font-black text-on-surface text-base">Manufacturing</div>
            <div className="font-headline-md font-black text-primary text-base">Green Products</div>
          </div>
        </a>

        <nav className="hidden md:flex gap-stack-md">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium hover:text-primary transition-all duration-200 active:scale-95">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#quote" className="hidden sm:inline-block bg-primary text-on-primary font-label-caps text-label-caps px-stack-md py-stack-sm uppercase hover:bg-primary-container transition-colors no-underline">Get a Quote</a>
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
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-headline-md text-label-caps uppercase tracking-wider text-on-surface-variant font-medium py-3 border-b border-outline-variant/40 last:border-b-0 hover:text-primary">{l.label}</a>
            ))}
            <a href="#quote" onClick={() => setOpen(false)} className="mt-2 bg-primary text-on-primary text-center font-label-caps text-label-caps px-stack-md py-stack-sm uppercase hover:bg-primary-container transition-colors no-underline">Get a Quote</a>
          </nav>
        </div>
      )}
    </header>
  )
}
