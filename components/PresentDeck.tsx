'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import Hero from '@/components/Hero'
import StatStrip from '@/components/StatStrip'
import Products from '@/components/Products'
import Industries from '@/components/Industries'
import Sustainability from '@/components/Sustainability'
import About from '@/components/About'
import LocationsMap from '@/components/LocationsMap'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

/* ---------------------------------------------------------------------------
 * Presentation / kiosk mode ("attract loop") — for mixers, trade shows, events.
 *
 * The page slowly auto-scrolls top → bottom, then resets and starts over. Every
 * section re-animates from scratch on each pass, so the loop always looks alive.
 *
 * Tune the pacing here. Times are in milliseconds.
 * ------------------------------------------------------------------------- */
const HOLD_TOP_MS = 3200 // pause at the top (lets the hero video + title land)
const SCROLL_MS = 60000 // time for one full top → bottom pass (~1 min)
const HOLD_BOTTOM_MS = 4500 // pause at the bottom before looping back
const UI_IDLE_MS = 4000 // hide the on-screen chrome after this much no-input

type Phase = 'holdTop' | 'scroll' | 'holdBottom'

/** Wraps a section so it fades/slides in the moment it enters the viewport.
 *  One-shot per mount — because the whole deck remounts every loop, this
 *  re-fires on every pass, giving a clean animation reset each time. */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-in')
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="present-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export default function PresentDeck() {
  const router = useRouter()

  // Bumping `cycle` remounts the whole deck → resets counters, hero video,
  // accordion, and every Reveal so each loop animates fresh.
  const [cycle, setCycle] = useState(0)
  const [paused, setPaused] = useState(false)
  const [showUi, setShowUi] = useState(true)

  const pausedRef = useRef(paused)
  pausedRef.current = paused

  const phaseRef = useRef<Phase>('holdTop')
  const phaseStartRef = useRef(0)
  const lastFrameRef = useRef(0)
  const rafRef = useRef<number>()
  const barRef = useRef<HTMLDivElement>(null)
  const uiTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const exit = useCallback(() => router.push('/'), [router])

  // Show the chrome, then re-arm the idle-hide timer.
  const wakeUi = useCallback(() => {
    setShowUi(true)
    if (uiTimerRef.current) clearTimeout(uiTimerRef.current)
    uiTimerRef.current = setTimeout(() => setShowUi(false), UI_IDLE_MS)
  }, [])

  // Presentation-mode body/html flags: kill the fixed-header padding, disable
  // native smooth-scroll (it fights our rAF driver), hide the scrollbar.
  useEffect(() => {
    const html = document.documentElement
    html.classList.add('present-active')
    document.body.classList.add('present-active')
    return () => {
      html.classList.remove('present-active')
      document.body.classList.remove('present-active')
    }
  }, [])

  // Keyboard controls.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        setPaused((p) => !p)
        wakeUi()
      } else if (e.key === 'Escape' || e.key === 'q') {
        exit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [exit, wakeUi])

  // Reveal the chrome on any pointer/touch activity; auto-hide when idle.
  useEffect(() => {
    wakeUi()
    const onMove = () => wakeUi()
    window.addEventListener('pointermove', onMove)
    window.addEventListener('touchstart', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('touchstart', onMove)
      if (uiTimerRef.current) clearTimeout(uiTimerRef.current)
    }
  }, [wakeUi])

  // The auto-scroll driver — a single long-lived rAF loop.
  useEffect(() => {
    phaseRef.current = 'holdTop'
    phaseStartRef.current = performance.now()
    lastFrameRef.current = performance.now()
    window.scrollTo(0, 0)

    const maxScroll = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight)

    const step = (now: number) => {
      const dt = now - lastFrameRef.current
      lastFrameRef.current = now

      // While paused, freeze elapsed time so the phase resumes where it left off.
      if (pausedRef.current) {
        phaseStartRef.current += dt
      } else {
        const elapsed = now - phaseStartRef.current
        const phase = phaseRef.current

        if (phase === 'holdTop') {
          if (elapsed >= HOLD_TOP_MS) {
            phaseRef.current = 'scroll'
            phaseStartRef.current = now
          }
        } else if (phase === 'scroll') {
          const p = Math.min(1, elapsed / SCROLL_MS)
          window.scrollTo(0, maxScroll() * p)
          if (p >= 1) {
            phaseRef.current = 'holdBottom'
            phaseStartRef.current = now
          }
        } else if (phase === 'holdBottom') {
          if (elapsed >= HOLD_BOTTOM_MS) {
            window.scrollTo(0, 0)
            setCycle((c) => c + 1) // remount the deck → reset every animation
            phaseRef.current = 'holdTop'
            phaseStartRef.current = now
          }
        }
      }

      if (barRef.current) {
        const ratio = Math.min(1, window.scrollY / maxScroll())
        barRef.current.style.transform = `scaleX(${ratio})`
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className={showUi ? 'present-show-ui' : undefined}>
      {/* Loop progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-primary"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Presenting chrome — fades out when idle */}
      <div
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-opacity duration-500 ${
          showUi ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
          <span className="relative flex h-2 w-2">
            {!paused && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2 w-2 rounded-full ${
                paused ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
            />
          </span>
          {paused ? 'Paused' : 'Presenting'}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPaused((p) => !p)
              wakeUi()
            }}
            className="rounded-full bg-black/55 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition-colors hover:bg-black/75"
          >
            {paused ? 'Resume' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={exit}
            className="rounded-full bg-black/55 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur transition-colors hover:bg-black/75"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Idle hint */}
      <div
        className={`fixed inset-x-0 bottom-4 z-50 flex justify-center transition-opacity duration-500 ${
          showUi ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="rounded-full bg-black/45 px-4 py-1.5 text-[11px] font-medium tracking-wide text-white/90 backdrop-blur">
          Space to pause · Esc to exit
        </span>
      </div>

      {/* The deck. `key={cycle}` remounts it every loop for a full animation reset. */}
      <div key={cycle}>
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <StatStrip />
        </Reveal>
        <Reveal>
          <Products />
        </Reveal>
        <Reveal>
          <Industries />
        </Reveal>
        <Reveal>
          <Sustainability />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <LocationsMap />
        </Reveal>
        <Reveal>
          <FAQ />
        </Reveal>
        <Reveal>
          <Footer />
        </Reveal>
      </div>
    </div>
  )
}
