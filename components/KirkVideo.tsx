'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  caption: string
  pauseLabel: string
  playLabel: string
}

export default function KirkVideo({ caption, pauseLabel, playLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  // Tracks a deliberate pause so the offscreen observer below doesn't
  // override the user and restart playback when they scroll back.
  const userPaused = useRef(false)
  const [playing, setPlaying] = useState(true)
  const [revealed, setRevealed] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // `autoPlay` fires before this effect, so reduced-motion users need an
    // explicit pause rather than a missing attribute. They keep the poster
    // frame and can opt in with the toggle.
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      el.pause()
      userPaused.current = true
      setReduced(true)
      setPlaying(false)
      setRevealed(true)
    }

    // Same iOS Safari autoplay stall the homepage hero works around: muted +
    // playsInline isn't always enough (Low Power Mode, restored tabs).
    const tryPlay = () => {
      if (userPaused.current) return
      void el.play().catch(() => {})
    }
    if (!prefersReduced) tryPlay()
    document.addEventListener('visibilitychange', tryPlay)
    document.addEventListener('touchstart', tryPlay, { once: true })

    // Doubles as the scroll-reveal trigger and as a battery guard, so a 9s
    // loop isn't running while someone reads the rest of the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          tryPlay()
        } else {
          el.pause()
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)

    return () => {
      document.removeEventListener('visibilitychange', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
      io.disconnect()
    }
  }, [])

  const toggle = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      userPaused.current = false
      void el.play().catch(() => {})
      setPlaying(true)
    } else {
      userPaused.current = true
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <figure className="w-full flex flex-col gap-stack-sm m-0">
      {/* Without JS the observer never runs, so the reveal state would strand
          the video at opacity-0. Keep it visible in that case. */}
      <noscript>
        <style>{`.kirk-reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <div
        className={[
          'kirk-reveal relative border border-outline-variant bg-white',
          'shadow-[6px_6px_0_0_theme(colors.surface-tint)] md:shadow-[14px_14px_0_0_theme(colors.surface-tint)]',
          reduced ? '' : 'transition-[opacity,transform] duration-700 ease-out',
          revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        ].join(' ')}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/kirk-gibson-poster.webp"
          disablePictureInPicture
          disableRemotePlayback
          className="block w-full aspect-video object-cover"
        >
          <source src="/kirk-gibson.mp4" type="video/mp4" />
        </video>

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? pauseLabel : playLabel}
          className="absolute bottom-4 right-4 inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-4 border border-outline-variant bg-white/85 backdrop-blur-sm font-label-caps text-[11px] uppercase tracking-[0.14em] text-on-surface hover:bg-white active:bg-surface-container-low transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {/* Inline SVG rather than ❙❙ / ▶ glyphs, which render at wildly
              different weights and baselines depending on the fallback font. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 10 12"
            className="w-[9px] h-[11px] fill-primary shrink-0"
          >
            {playing ? (
              <>
                <rect x="0" y="0" width="3.5" height="12" />
                <rect x="6.5" y="0" width="3.5" height="12" />
              </>
            ) : (
              <polygon points="0,0 10,6 0,12" />
            )}
          </svg>
          {playing ? pauseLabel : playLabel}
        </button>
      </div>

      <figcaption className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        {caption}
      </figcaption>
    </figure>
  )
}
