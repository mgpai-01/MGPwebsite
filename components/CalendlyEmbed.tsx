'use client'

import { useState } from 'react'
import LoadingSeal from '@/components/LoadingSeal'

// Calendly booking iframe with a branded loading state that stays up until the
// widget finishes loading, so viewers see an on-brand placeholder instead of a
// blank box + Calendly's default spinner.
export default function CalendlyEmbed({
  url,
  loadingLabel = 'Loading available times…',
  title = 'Schedule an appointment with Manufacturing Green Products',
}: {
  url: string
  loadingLabel?: string
  title?: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="sched-in sched-in-2 relative overflow-hidden border border-outline-variant bg-surface-container-lowest"
      style={{ minHeight: 760 }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-surface-container-lowest">
          <LoadingSeal size={56} />
          <span className="font-label-caps text-label-caps uppercase tracking-[0.14em] text-on-surface-variant">
            {loadingLabel}
          </span>
        </div>
      )}
      <iframe
        src={url}
        title={title}
        className="relative w-full"
        style={{ height: 760, border: 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
