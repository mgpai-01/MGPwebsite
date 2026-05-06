'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let st: { kill: () => void } | null = null
    let cancelled = false

    ;(async () => {
      const gsapMod = await import('gsap')
      const stMod = await import('gsap/ScrollTrigger')
      if (cancelled) return

      const gsap = gsapMod.default || gsapMod
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default
      gsap.registerPlugin(ScrollTrigger)

      const hero = heroRef.current
      const video = videoRef.current
      if (!hero || !video) return

      const setup = () => {
        if (!video.duration || isNaN(video.duration)) return

        st = ScrollTrigger.create({
          trigger: hero,
          start: 'top top',
          end: '+=1800',
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self: { progress: number }) => {
            if (video.duration) {
              const t = self.progress * video.duration
              if (Math.abs(video.currentTime - t) > 0.01) {
                video.currentTime = t
              }
            }
          },
        })
      }

      if (video.readyState >= 1 && video.duration) {
        setup()
      } else {
        video.addEventListener('loadedmetadata', setup, { once: true })
      }
    })()

    return () => {
      cancelled = true
      if (st) st.kill()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-white min-h-[100vh]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute top-0 right-0 h-full w-[120%] object-cover translate-x-[8%]"
        >
          <source src="/mp_.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
      </div>

      <div className="relative z-10 py-section-padding px-gutter">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
          <div className="max-w-3xl flex flex-col gap-stack-sm">
            <span className="inline-flex items-center self-start border border-primary/30 rounded-full px-4 py-1.5 font-label-caps text-[12px] uppercase tracking-[0.16em] text-primary bg-white/80 backdrop-blur-sm">
              ISPM-15 Certified · FSC Member
            </span>
            <h1 className="font-headline-xl text-headline-xl uppercase text-on-surface">
              The Gold Standard in Industrial Pallet Solutions
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              The Inland Empire’s leader in reliable, sustainable, and
              heavy-duty logistics foundations. MGP supplies new, recycled,
              repaired and custom wood pallets to warehouses, manufacturers,
              and distributors — backed by a commitment to sustainable
              forestry.
            </p>
          </div>
          <div className="flex gap-stack-sm flex-wrap">
            <a href="#quote" className="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary-container transition-colors shadow-[4px_4px_0_0_theme(colors.surface-tint)] no-underline">Get a Quote</a>
            <a href="#products" className="border-2 border-on-surface text-on-surface px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-on-surface hover:text-white transition-colors no-underline">View Products</a>
          </div>
        </div>
      </div>
    </section>
  )
}
