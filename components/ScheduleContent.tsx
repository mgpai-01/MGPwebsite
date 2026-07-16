'use client'

import { useT } from '@/lib/i18n'
import CalendlyEmbed from '@/components/CalendlyEmbed'

// Client body for /schedule so the copy translates with the language switcher.
export default function ScheduleContent({ embedUrl }: { embedUrl: string }) {
  const { t } = useT()
  const s = t.schedulePage

  return (
    <main className="bg-surface px-gutter py-section-padding">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="sched-in flex max-w-2xl flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary">
            {s.eyebrow}
          </span>
          <h1 className="font-headline-lg text-headline-lg text-primary">{s.title}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">{s.subtitle}</p>
        </div>

        {/* Calendly inline embed with branded loading state */}
        <CalendlyEmbed url={embedUrl} loadingLabel={s.loading} title={s.iframeTitle} />

        <p className="sched-in sched-in-3 font-body-md text-body-md text-on-surface-variant">
          {s.talkPrefix}
          <a href="tel:+19098271438" className="text-primary hover:underline">
            (909) 827-1438
          </a>
          {s.talkMid}
          <a href="mailto:mgp@palletmail.com" className="text-primary hover:underline">
            mgp@palletmail.com
          </a>
          {s.talkSuffix}
        </p>
      </div>
    </main>
  )
}
