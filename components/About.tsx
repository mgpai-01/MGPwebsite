'use client'

import { useT } from '@/lib/i18n'

const numbers = ['01', '02', '03', '04']

export default function About() {
  const { t } = useT()
  return (
    <section id="about" className="py-section-padding px-gutter bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-start">
        <div className="flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">{t.about.label}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">{t.about.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t.about.body}</p>
        </div>
        <div className="flex flex-col gap-stack-md">
          {t.about.reasons.map((r, i) => (
            <div key={r.title} className="flex gap-stack-sm items-start border-l-4 border-primary pl-stack-sm">
              <span className="font-headline-md text-headline-md text-primary text-xl">{numbers[i]}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{r.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
