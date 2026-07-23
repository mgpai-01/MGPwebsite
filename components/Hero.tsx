'use client'

import { useEffect, useRef } from 'react'
import { useT } from '@/lib/i18n'

export default function Hero() {
  const { t } = useT()
  const videoRef = useRef<HTMLVideoElement>(null)

  // iOS Safari sometimes stalls autoplay even with muted+playsInline (Low
  // Power Mode, backgrounded tab restart, etc.), which surfaces a play
  // button. Kicking play() imperatively on mount avoids that fallback UI.
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tryPlay = () => { void el.play().catch(() => {}) }
    tryPlay()
    // Retry on visibility change (returning from a background tab) and on
    // any first touch, which is enough to satisfy iOS gesture policies.
    document.addEventListener('visibilitychange', tryPlay)
    document.addEventListener('touchstart', tryPlay, { once: true })
    return () => {
      document.removeEventListener('visibilitychange', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-white min-h-[100vh]">
      <div className="absolute inset-0 overflow-hidden bg-white">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute top-0 right-0 h-full w-[120%] md:w-[105%] object-cover translate-x-[8%] md:translate-x-0"
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay: heavy on phones (protects text over the video),
            softer on iPad+ so the pallet visual shows through, minimal on
            desktop where there's enough horizontal room. */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent md:from-white md:via-white/70 md:to-transparent lg:via-white/60" />
      </div>

      <div className="relative z-10 py-section-padding px-gutter">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
          <div className="max-w-3xl flex flex-col gap-stack-sm">
            <span className="inline-flex items-center self-start border border-primary/30 rounded-full px-4 py-1.5 font-label-caps text-[12px] uppercase tracking-[0.16em] text-primary bg-white/80 backdrop-blur-sm">
              {t.hero.badge}
            </span>
            <h1 className="font-headline-xl text-headline-xl uppercase text-on-surface">
              {t.hero.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {t.hero.body}
            </p>
          </div>
          <div className="flex gap-stack-sm flex-wrap">
            <a href="#quote" className="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary-container transition-colors shadow-[4px_4px_0_0_theme(colors.surface-tint)] no-underline">{t.hero.cta1}</a>
            <a href="#products" className="border-2 border-on-surface text-on-surface px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-on-surface hover:text-white transition-colors no-underline">{t.hero.cta2}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
