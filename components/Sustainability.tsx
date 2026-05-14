const items: { title: string; body: string; image?: string; link?: { href: string; label: string } }[] = [
  {
    title: 'WPA Director',
    body: 'A seat on the Western Pallet Association board — helping shape industry standards, safety practices, and sustainability policy across the West Coast supply chain.',
    image: '/wpa.png',
    link: { href: 'https://www.westernpallet.org/board-directors/', label: 'View board directors' },
  },
  { title: 'Woodpack Global Member', body: 'Part of an international network of vetted pallet manufacturers — sharing best practices, capacity, and consistent quality standards for clients shipping worldwide.', image: '/woodpack.png' },
  { title: 'Samsara Fleet Tracking', body: 'Real-time GPS, route optimization, and verified ETAs across every MGP truck. Customers see exactly when pallets arrive, every time.', image: '/samsara.png' },
  { title: 'Local Sourcing', body: 'Regional mills reduce transportation emissions and support local economies.' },
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
  return (
    <section id="sustainability" className="py-section-padding px-gutter bg-surface-container-low">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="max-w-2xl flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">Sustainability</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Standards. Stewardship. Leadership.</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Active seats on the industry’s top boards, plus rigorous environmental practices — from forest sourcing to final delivery. Sustainability runs deeper than a claim; it’s how we operate.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
          {items.map(({ title, body, image, link }) => (
            <div key={title} className="border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
              <div className={image ? "w-16 h-16 flex items-center justify-center overflow-hidden" : "w-12 h-12 bg-secondary-container text-primary flex items-center justify-center"}>
                {image ? (
                  <img src={image} alt={title} className="max-w-full max-h-full object-contain" />
                ) : (
                  <LeafIcon />
                )}
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
              {link && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-auto inline-flex items-center gap-1 font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary hover:underline underline-offset-4"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
