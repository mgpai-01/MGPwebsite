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
const MANUAL_RESUME_MS = 2800 // after a hand-scroll stops, wait this long before resuming

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
  const manualRef = useRef(false) // true while the viewer is hand-scrolling
  const manualTimerRef = useRef<ReturnType<typeof setTimeout>>()
  const maxScrollRef = useRef(1) // cached page scroll range, for the progress bar

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
    maxScrollRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo(0, 0)

    const step = (now: number) => {
      const dt = now - lastFrameRef.current
      lastFrameRef.current = now

      // Progress bar tracks the actual scroll position — so it moves while the
      // loop auto-scrolls, moves with the viewer's hand-scroll, and picks right
      // back up when the loop resumes. Uses cached range (no per-frame layout).
      if (barRef.current) {
        const r = Math.min(1, Math.max(0, window.scrollY / maxScrollRef.current))
        barRef.current.style.transform = `scaleX(${r})`
      }

      const container = containerRef.current
      const count = container ? container.children.length : 0

      // While paused, freeze elapsed time so the current section resumes cleanly.
      if (pausedRef.current || count === 0) {
        if (pausedRef.current) phaseStartRef.current += dt
        rafRef.current = requestAnimationFrame(step)
        return
      }

      // Viewer is scrolling by hand — stop driving so we don't fight them; a
      // separate handler re-syncs to their section and resumes shortly after.
      if (manualRef.current) {
        rafRef.current = requestAnimationFrame(step)
        return
      }

      const viewH = window.innerHeight
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewH)
      maxScrollRef.current = maxScroll
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

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [started])

  // Let people grab the presentation: hand-scrolling suspends the auto-advance,
  // and shortly after they stop it resumes from whichever section they landed on.
  useEffect(() => {
    if (!started) return

    const resync = () => {
      const container = containerRef.current
      if (container && container.children.length) {
        const mid = window.scrollY + window.innerHeight / 2
        let best = 0
        let bestDist = Infinity
        for (let i = 0; i < container.children.length; i++) {
          const el = container.children[i] as HTMLElement
          const center = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight / 2
          const d = Math.abs(center - mid)
          if (d < bestDist) {
            bestDist = d
            best = i
          }
        }
        // Resume the loop by moving forward from where they landed: glide on to
        // the next section (downward) so motion — and the progress line — start
        // up again promptly, without snapping back to re-center.
        idxRef.current = Math.min(best + 1, container.children.length - 1)
        planRef.current = null
      }
      manualRef.current = false
    }

    const markManual = () => {
      if (!manualRef.current) {
        // Entering manual: refresh the page range once so the progress bar
        // tracks the hand-scroll accurately (no per-frame layout reads).
        maxScrollRef.current = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      }
      manualRef.current = true
      wakeUi()
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current)
      manualTimerRef.current = setTimeout(resync, MANUAL_RESUME_MS)
    }

    const navKeys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'])
    const onNavKey = (e: KeyboardEvent) => {
      if (navKeys.has(e.key)) markManual()
    }

    window.addEventListener('wheel', markManual, { passive: true })
    window.addEventListener('touchmove', markManual, { passive: true })
    window.addEventListener('keydown', onNavKey)
    return () => {
      window.removeEventListener('wheel', markManual)
      window.removeEventListener('touchmove', markManual)
      window.removeEventListener('keydown', onNavKey)
      if (manualTimerRef.current) clearTimeout(manualTimerRef.current)
    }
  }, [started, wakeUi])

  return (
    <div className={showUi ? 'present-show-ui' : undefined}>
      {/* Fullscreen launch screen — the tap is what lets us enter fullscreen
          and grab the wake-lock, so the loop only starts after it. */}
      {!started && (
        <div className="fixed inset-0 z-[70] overflow-hidden bg-[#0f1913]">
          {/* Pallet footage, dimmed behind a green scrim for ambient texture. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/mp_.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(130% 90% at 50% 30%, rgba(39,80,55,0.55) 0%, rgba(26,48,37,0.85) 46%, rgba(12,20,15,0.96) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(60% 55% at 50% 46%, rgba(0,0,0,0.35) 0%, transparent 70%)' }}
          />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
            <span className="text-[12.5px] font-semibold uppercase tracking-[0.28em] text-[#a7cbb4]">
              Fontana, California&nbsp;&nbsp;·&nbsp;&nbsp;Est. 1980
            </span>

            <div
              className="relative h-[200px] w-[200px] overflow-hidden"
              style={{ borderRadius: '50%', boxShadow: '0 20px 48px rgba(0,0,0,0.5)' }}
            >
              {/* Zoom in so the emblem fills the circle, cropping the logo's
                  dead navy margin. */}
              <img
                src="/logo.png"
                alt="Manufacturing Green Products logo"
                className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
                style={{ width: '152%', height: '152%' }}
              />
            </div>

            <h1
              className="font-headline-lg text-headline-lg max-w-3xl text-[#f4f2ec]"
              style={{ textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}
            >
              Manufacturing Green Products
            </h1>

            <div className="flex items-center gap-3.5">
              <span className="h-px w-[54px] bg-white/25" />
              <span className="h-[5px] w-[5px] rotate-45 bg-[#6a9e78]" />
              <span className="h-px w-[54px] bg-white/25" />
            </div>

            <span
              className="text-[14px] font-semibold uppercase tracking-[0.16em] text-[#d5e4da]"
              style={{ textShadow: '0 1px 12px rgba(0,0,0,0.5)' }}
            >
              ISPM-15 Certified&nbsp;&nbsp;·&nbsp;&nbsp;WPA Director&nbsp;&nbsp;·&nbsp;&nbsp;45+ Years
            </span>

            <button
              type="button"
              onClick={begin}
              className="mt-3 inline-flex items-center gap-3 rounded-full bg-primary px-9 py-4 text-[14px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg ring-1 ring-white/10 transition-transform hover:scale-[1.03]"
            >
              <span className="text-[11px] leading-none">▶</span> Start Presenting
            </button>

            <span className="mt-1 text-[12px] tracking-wide text-white/40">
              Scroll to jump · Space to pause · Esc to exit
            </span>
          </div>
        </div>
      )}

      {/* Loop progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-black/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-primary"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Presenting chrome + staff controls — fades out when idle. Kept on the
          left so the top-right corner is free for the persistent phone pill. */}
      <div
        className={`fixed inset-x-0 top-0 z-50 flex items-center gap-3 px-6 py-4 transition-opacity duration-500 ${
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
          Scroll to jump · Space to pause · Esc to exit
        </span>
      </div>

      {/* Persistent call-to-action — top-right, stays visible the whole loop so
          attendees can always see and tap the number to call. */}
      {started && (
        <a
          href="tel:+19098271438"
          className="fixed right-5 top-4 z-50 inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3.5 text-[18px] font-semibold tracking-wide text-white no-underline shadow-lg ring-1 ring-white/15"
        >
          <span className="text-xl leading-none">📞</span> (909) 827-1438
        </a>
      )}

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
