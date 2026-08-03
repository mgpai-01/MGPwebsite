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

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    // `autoPlay` fires before this effect, so reduced-motion users need an
    // explicit pause rather than a missing attribute. They keep the poster
    // frame and can opt in with the toggle.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.pause()
      userPaused.current = true
      setPlaying(false)
      return
    }

    // Same iOS Safari autoplay stall the homepage hero works around: muted +
    // playsInline isn't always enough (Low Power Mode, restored tabs).
    const tryPlay = () => {
      if (userPaused.current) return
      void el.play().catch(() => {})
    }
    tryPlay()
    document.addEventListener('visibilitychange', tryPlay)
    document.addEventListener('touchstart', tryPlay, { once: true })

    // The band sits below the fold, so don't burn battery looping a 9s clip
    // while someone reads the rest of the page.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else el.pause()
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
    <figure className="w-full max-w-5xl flex flex-col gap-stack-sm m-0">
      <div className="relative border border-outline-variant bg-white shadow-[8px_8px_0_0_theme(colors.surface-tint)]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          className="absolute bottom-3 right-3 flex items-center gap-2 border border-outline-variant bg-white/85 backdrop-blur-sm px-3 py-1.5 font-label-caps text-[11px] uppercase tracking-[0.14em] text-on-surface hover:bg-white transition-colors"
        >
          {/* Inline SVG rather than ❙❙ / ▶ glyphs, which render at wildly
              different weights and baselines depending on the fallback font. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 10 12"
            className="w-[9px] h-[11px] fill-primary"
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

      <figcaption className="font-body-md text-body-md text-on-surface-variant">
        {caption}
      </figcaption>
    </figure>
  )
}
