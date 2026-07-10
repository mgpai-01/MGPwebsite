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
 * Slide-style auto-advance: glide to each section, STOP and hold it on screen
 * long enough to read, then move to the next. A section taller than the screen
 * is slowly panned through during its hold so nothing is missed. After the last
 * section it resets to the top and starts over — every section re-animates on
 * each pass, so the loop always looks alive.
 *
 * Tune the pacing here. Times are in milliseconds.
 * ------------------------------------------------------------------------- */
const TRANSITION_MS = 1000 // glide time between one section and the next
const DWELL_MS = 5200 // how long to hold on a section that fits on screen (read time)
const MAX_DWELL_MS = 14000 // cap on the hold for tall sections being panned
const PAN_SPEED = 42 // px/sec slow-pan reading speed for taller-than-screen sections
const TOP_GAP = 20 // breathing room above a top-aligned section
const UI_IDLE_MS = 4000 // hide the on-screen chrome after this much no-input

type SubPhase = 'enter' | 'dwell'
type Plan = { enterY: number; panToY: number; dwellMs: number }

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Wraps a section so it fades/slides in the moment it enters the viewport.
 *  One-shot per mount — because the whole deck remounts every loop, this
 *  re-fires on every pass, giving a clean animation reset each time. */
function Reveal({ children }: { children: React.ReactNode }) {
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
    <div ref={ref} className="present-reveal">
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
  const [started, setStarted] = useState(false) // gated behind the fullscreen launch tap

  const pausedRef = useRef(paused)
  pausedRef.current = paused

  const wakeLockRef = useRef<{ release?: () => void; addEventListener?: (t: string, cb: () => void) => void } | null>(null)

  // Slide-machine state.
  const containerRef = useRef<HTMLDivElement>(null)
  const idxRef = useRef(0)
  const planRef = useRef<Plan | null>(null)
  const subPhaseRef = useRef<SubPhase>('enter')
  const enterFromRef = useRef(0)
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

  // Launch: enter true fullscreen (needs this user gesture) + hold a screen
  // wake-lock, then start the loop. Falls through gracefully if either is
  // unsupported or denied.
  const begin = useCallback(async () => {
    try {
      await document.documentElement.requestFullscreen?.()
    } catch {
      /* fullscreen denied — present windowed */
    }
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<typeof wakeLockRef.current> } }
      if (nav.wakeLock?.request) {
        wakeLockRef.current = await nav.wakeLock.request('screen')
        wakeLockRef.current?.addEventListener?.('release', () => {
          wakeLockRef.current = null
        })
      }
    } catch {
      /* wake-lock unsupported — screen may sleep */
    }
    setStarted(true)
    wakeUi()
  }, [wakeUi])

  // Re-acquire the wake-lock when returning to the tab (browsers drop it when
  // the page is hidden), and release it on exit.
  useEffect(() => {
    if (!started) return
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<typeof wakeLockRef.current> } }
    const reacquire = async () => {
      if (document.visibilityState === 'visible' && !wakeLockRef.current && nav.wakeLock?.request) {
        try {
          wakeLockRef.current = await nav.wakeLock.request('screen')
          wakeLockRef.current?.addEventListener?.('release', () => {
            wakeLockRef.current = null
          })
        } catch {
          /* ignore */
        }
      }
    }
    document.addEventListener('visibilitychange', reacquire)
    return () => {
      document.removeEventListener('visibilitychange', reacquire)
      try {
        wakeLockRef.current?.release?.()
      } catch {
        /* ignore */
      }
      wakeLockRef.current = null
    }
  }, [started])

  // Presentation-mode body/html flags: kill the fixed-header padding, disable
  // native smooth-scroll (it fights our rAF driver), hide the scrollbar.
  useEffect(() => {
    const html = document.documentElement
    html.classList.add('present-active')
    document.body.classList.add('present-active')
    return () => {
      html.classList.remove('present-active')
      document.body.classList.remove('present-active')
      try {
        if (document.fullscreenElement) document.exitFullscreen?.()
      } catch {
        /* ignore */
      }
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

  // The slide driver — a single long-lived rAF loop that advances section by
  // section: glide in, hold to read, then move on. Loops at the end.
  useEffect(() => {
    if (!started) return
    idxRef.current = 0
    planRef.current = null
    subPhaseRef.current = 'enter'
    enterFromRef.current = 0
    phaseStartRef.current = performance.now()
    lastFrameRef.current = performance.now()
    window.scrollTo(0, 0)

    const step = (now: number) => {
      const dt = now - lastFrameRef.current
      lastFrameRef.current = now

      const container = containerRef.current
      const count = container ? container.children.length : 0

      // While paused, freeze elapsed time so the current section resumes cleanly.
      if (pausedRef.current || count === 0) {
        if (pausedRef.current) phaseStartRef.current += dt
        rafRef.current = requestAnimationFrame(step)
        return
      }

      const viewH = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewH)
      const clamp = (y: number) => Math.max(0, Math.min(maxScroll, y))

      // Measure the current section on demand and build its glide/hold plan.
      if (!planRef.current) {
        const el = container!.children[idxRef.current] as HTMLElement
        const absTop = el.getBoundingClientRect().top + window.scrollY
        const h = el.offsetHeight
        const fits = h <= viewH - 8
        const enterY = clamp(fits ? absTop - (viewH - h) / 2 : absTop - TOP_GAP)
        const panToY = fits ? enterY : clamp(absTop + h - viewH + TOP_GAP)
        const dwellMs = fits
          ? DWELL_MS
          : Math.min(MAX_DWELL_MS, Math.max(DWELL_MS, (Math.abs(panToY - enterY) / PAN_SPEED) * 1000))
        planRef.current = { enterY, panToY, dwellMs }
        enterFromRef.current = window.scrollY
        subPhaseRef.current = 'enter'
        phaseStartRef.current = now
      }

      const plan = planRef.current
      const elapsed = now - phaseStartRef.current

      if (subPhaseRef.current === 'enter') {
        const p = Math.min(1, elapsed / TRANSITION_MS)
        window.scrollTo(0, enterFromRef.current + (plan.enterY - enterFromRef.current) * easeInOut(p))
        if (p >= 1) {
          subPhaseRef.current = 'dwell'
          phaseStartRef.current = now
        }
      } else {
        // Hold on the section; slow-pan through it if it's taller than the screen.
        const p = Math.min(1, elapsed / plan.dwellMs)
        if (plan.panToY !== plan.enterY) {
          window.scrollTo(0, plan.enterY + (plan.panToY - plan.enterY) * p)
        }
        if (p >= 1) {
          planRef.current = null
          const next = idxRef.current + 1
          if (next >= count) {
            window.scrollTo(0, 0)
            idxRef.current = 0
            setCycle((c) => c + 1) // remount the deck → reset every animation
          } else {
            idxRef.current = next
          }
        }
      }

      // Segment-based progress bar.
      if (barRef.current) {
        const active = planRef.current
        const sub =
          active && subPhaseRef.current === 'dwell'
            ? Math.min(1, (now - phaseStartRef.current) / active.dwellMs)
            : 0
        const ratio = count ? Math.min(1, (idxRef.current + sub) / count) : 0
        barRef.current.style.transform = `scaleX(${ratio})`
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started])

  return (
    <div className={showUi ? 'present-show-ui' : undefined}>
      {/* Fullscreen launch screen — the tap is what lets us enter fullscreen
          and grab the wake-lock, so the loop only starts after it. */}
      {!started && (
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 bg-[#1c3325] px-6 text-center">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.22em] text-primary-fixed-dim text-[13px]">
            Presentation Mode
          </span>
          <h1 className="font-headline-lg text-headline-lg max-w-3xl text-white">
            Manufacturing Green Products
          </h1>
          <p className="text-body-lg max-w-md text-white/70">
            An auto-scrolling showcase for events &amp; mixers — runs fullscreen, holds on each
            section to read, and loops on its own.
          </p>
          <button
            type="button"
            onClick={begin}
            className="mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold uppercase tracking-[0.12em] text-white transition-transform hover:scale-[1.03]"
          >
            <span className="text-lg leading-none">▶</span> Start presenting
          </button>
          <span className="text-[12px] text-white/40">Space to pause · Esc to exit</span>
        </div>
      )}

      {/* Loop progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-primary transition-transform duration-300 ease-out"
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
      <div key={cycle} ref={containerRef}>
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
