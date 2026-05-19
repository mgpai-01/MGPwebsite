'use client'

import { useT } from '@/lib/i18n'

const locationMeta = [
  { address: '8386 Sultana Ave, Fontana, CA 92335', query: '8386+Sultana+Ave,+Fontana,+CA+92335', isHome: true },
  { address: '14619 Merrill Ave, Fontana, CA 92335', query: '14619+Merrill+Ave,+Fontana,+CA+92335', isHome: false },
  { address: '1326 W Citrus St, Riverside, CA 92507', query: '1326+W+Citrus+St,+Riverside,+CA+92507', isHome: false },
]

export default function LocationsMap() {
  const { t } = useT()
  const combinedSrc =
    'https://www.google.com/maps?f=d&hl=en&output=embed&z=11' +
    '&saddr=8386+Sultana+Ave,+Fontana,+CA+92335' +
    '&daddr=14619+Merrill+Ave,+Fontana,+CA+92335+to:1326+W+Citrus+St,+Riverside,+CA+92507'

  return (
    <section id="locations" className="py-section-padding px-gutter bg-surface-container-low">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-sm max-w-2xl">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">{t.locations.label}</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">{t.locations.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{t.locations.body}</p>
        </div>
        <div className="border-2 border-outline-variant bg-surface-container-lowest overflow-hidden">
          <iframe title="MGP locations map" src={combinedSrc} width="100%" height="460" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, display: 'block' }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
          {t.locations.items.map((loc, i) => {
            const meta = locationMeta[i]
            return (
              <div key={meta.address} className="border border-outline-variant bg-surface-container-lowest flex flex-col">
                <div className="h-56 bg-surface-container overflow-hidden">
                  <iframe title={`${loc.name} map`} src={`https://maps.google.com/maps?q=${meta.query}&t=&z=15&ie=UTF8&iwloc=&output=embed`} width="100%" height="100%" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, display: 'block' }} />
                </div>
                <div className="p-stack-md flex flex-col gap-stack-sm">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{loc.name}</h3>
                    {meta.isHome && (
                      <span className="font-label-caps text-[10px] uppercase tracking-wider bg-primary text-on-primary px-2 py-1">{t.locations.hq}</span>
                    )}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant">{meta.address}</p>
                  <a href={`https://www.google.com/maps/dir/?api=1&destination=${meta.query}`} target="_blank" rel="noopener noreferrer" className="font-label-caps text-label-caps uppercase text-primary border-b-2 border-primary self-start hover:text-primary-container transition-colors pb-1">{t.locations.directions} →</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
