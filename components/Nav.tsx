'use client'

import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300"
      style={{
        height: '72px',
        boxShadow: scrolled
          ? '0 1px 0 rgba(0,0,0,.08), 0 4px 24px rgba(0,0,0,.06)'
          : 'none',
      }}
    >
      <div
        className="flex items-center justify-between h-full mx-auto"
        style={{ maxWidth: '1360px', padding: '0 40px' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              backgroundColor: '#2a6b40',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {/* Swap for: <Image src="/mgp-logo.png" alt="MGP" width={42} height={42} /> */}
            <span
              className="font-condensed font-black text-white"
              style={{ fontSize: '13px', letterSpacing: '0.02em' }}
            >
              MGP
            </span>
          </div>
          <div style={{ lineHeight: '1.15' }}>
            <div
              className="font-condensed font-black"
              style={{ fontSize: '19px', color: '#1c2b1e' }}
            >
              Manufacturing
            </div>
            <div
              className="font-condensed font-black"
              style={{ fontSize: '19px', color: '#2a6b40' }}
            >
              Green Products
            </div>
          </div>
        </a>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { label: 'Products', href: '#products' },
            { label: 'Industries', href: '#industries' },
            { label: 'About', href: '#about' },
            { label: 'Sustainability', href: '#sustainability' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="nav-link font-sans"
              style={{ fontSize: '15px', color: '#1c2b1e' }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#quote"
          className="font-condensed font-bold uppercase text-white transition-opacity duration-200 hover:opacity-90"
          style={{
            backgroundColor: '#2a6b40',
            fontSize: '15px',
            letterSpacing: '0.05em',
            padding: '11px 26px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Get a Quote
        </a>
      </div>
    </nav>
  )
}
