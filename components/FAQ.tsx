'use client'

import { useState } from 'react'
import { useT } from '@/lib/i18n'

export default function FAQ() {
  const { t } = useT()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-section-padding px-gutter bg-surface">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="max-w-2xl flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">{t.faq.label}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">{t.faq.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t.faq.body}</p>
        </div>
        <div className="flex flex-col border-t border-outline-variant">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className="border-b border-outline-variant">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex justify-between items-center gap-stack-sm py-stack-md text-left hover:text-primary transition-colors"
                >
                  <span className="font-headline-md text-headline-md text-on-surface text-lg md:text-xl pr-2">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 w-8 h-8 border-2 border-current flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45 bg-primary text-on-primary border-primary' : 'text-primary'}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body-md text-body-md text-on-surface-variant pb-stack-md pr-12 max-w-3xl">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
