const items = [
  { title: 'WPA Director', body: 'A seat on the Western Pallet Association board — helping shape industry standards, safety practices, and sustainability policy across the West Coast supply chain.' },
  { title: 'Woodpack Global Member', body: 'Part of an international network of vetted pallet manufacturers — sharing best practices, capacity, and consistent quality standards for clients shipping worldwide.' },
  { title: 'Carbon Tracking', body: 'We measure and report our Scope 1 & 2 emissions annually.' },
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
          <h2 className="font-headline-lg text-headline-lg text-primary">Manufacturing Green is more than a name</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Sustainability isn’t a marketing claim — it’s the foundation of how we source, manufacture, and operate every day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
          {items.map(({ title, body }) => (
            <div key={title} className="border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
              <div className="w-12 h-12 bg-secondary-container text-primary flex items-center justify-center"><LeafIcon /></div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
