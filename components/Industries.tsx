'use client'

import { useT } from '@/lib/i18n'

export default function Industries() {
  const { t } = useT()
  return (
    <section id="industries" className="py-section-padding px-gutter bg-primary-container text-on-primary-container">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-stack-lg items-center">
        <div className="md:w-1/3 flex flex-col gap-stack-sm text-on-primary">
          <h2 className="font-headline-lg text-headline-lg">{t.industries.heading}</h2>
          <p className="font-body-md text-body-md opacity-90">{t.industries.body}</p>
        </div>
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-stack-sm w-full">
          {t.industries.list.map((name) => (
            <div key={name} className="industry-pill border border-on-primary/30 py-stack-sm px-unit text-center text-on-primary font-label-caps text-label-caps uppercase bg-primary-container hover:bg-primary cursor-default">{name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
