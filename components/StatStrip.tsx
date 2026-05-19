'use client'

import { useEffect, useRef, useState } from 'react'
import { useT } from '@/lib/i18n'

type Stat = { value: string; label: string; target: number; suffix: string }

const parse = (raw: string): { target: number; suffix: string } => {
  const m = raw.match(/^([\d,.]+)(.*)$/)
  if (!m) return { target: 0, suffix: raw }
  const numStr = m[1].replace(/,/g, '')
  return { target: parseFloat(numStr), suffix: m[2] }
}

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1600
          const start = performance.now()
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration)
            setN(target * easeOut(p))
            if (p < 1) requestAnimationFrame(tick)
            else setN(target)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target])

  const display = Number.isInteger(target) ? Math.floor(n).toString() : n.toFixed(1)
  return <span ref={ref}>{display}{suffix}</span>
}

export default function StatStrip() {
  const { t } = useT()
  const raw: { value: string; label: string }[] = [
    { value: '45+', label: t.stats.yearsExperience },
    { value: '250K+', label: t.stats.palletsPerMonth },
    { value: '100%', label: t.stats.ispmCompliant },
    { value: '24hr', label: t.stats.turnaround },
  ]
  const stats: Stat[] = raw.map((s) => ({ ...s, ...parse(s.value) }))
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-stack-lg px-gutter border-y-2 border-outline-variant">
      <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-stack-md text-center">
        {stats.map(({ label, target, suffix }) => (
          <div key={label} className="flex flex-col gap-unit">
            <span className="font-headline-md text-headline-md text-primary tabular-nums">
              <Counter target={target} suffix={suffix} />
            </span>
            <span className="font-label-caps text-label-caps uppercase">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
