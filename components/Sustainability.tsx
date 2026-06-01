'use client'

import { track } from '@vercel/analytics'
import { useT } from '@/lib/i18n'

// NOTE: replace PALLET_UNIVERSITY_URL below with the affiliate / referral
// URL provided by The Pallet University so click attribution flows back
// to MGP. UTM params let us cross-check clicks in Vercel Analytics.
const PALLET_UNIVERSITY_URL =
  'https://thepalletuniversity.com/?utm_source=mgpwebsite&utm_medium=referral&utm_campaign=pallet-university'

const imagesAndLinks: { image?: string; iconType?: 'leaf'; link?: { href: string; trackEvent?: string } }[] = [
  { image: '/wpa.png', link: { href: 'https://www.westernpallet.org/board-directors/' } },
  { image: '/woodpack.png', link: { href: 'https://woodpackglobal.org/members/default.asp?id=68677551' } },
  { image: '/samsara.png' },
  { iconType: 'leaf' },
  { image: '/pallet-university.png', link: { href: PALLET_UNIVERSITY_URL, trackEvent: 'pallet_university_click' } },
]

function LeafIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.11a1 1 0 0 0 1.71 1.04C7 18 9 16.3 12 16c0 0 1 2 0 4" />
      <path d="M9 11.85c3.8-2.4 7.2-5.85 9-9.85" />
    </svg>
  )
}

export default function Sustainability() {
  const { t } = useT()
  return (
    <section id="sustainability" className="py-section-padding px-gutter bg-surface-container-low">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="max-w-2xl flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">{t.sustainability.label}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">{t.sustainability.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t.sustainability.body}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-stack-md">
          {t.sustainability.items.map((item, i) => {
            const meta = imagesAndLinks[i] ?? {}
            return (
              <div key={item.title} className="border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
                <div className={meta.image ? 'w-16 h-16 flex items-center justify-center overflow-hidden' : 'w-12 h-12 bg-secondary-container text-primary flex items-center justify-center'}>
                  {meta.image ? (
                    <img src={meta.image} alt={item.title} className="max-w-full max-h-full object-contain" />
                  ) : (
                    <LeafIcon />
                  )}
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.body}</p>
                {meta.link && (
                  <a
                    href={meta.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={meta.link.trackEvent ? () => track(meta.link!.trackEvent!) : undefined}
                    className="group mt-auto inline-flex items-center gap-1 font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary hover:underline underline-offset-4"
                  >
                    <span>{t.sustainability.learnMore}</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
