const reasons = [
  { number: '01', title: 'Sustainable Sourcing', body: 'All lumber is sourced from certified sustainable forests with full chain-of-custody documentation for every load.' },
  { number: '02', title: 'Consistent Supply', body: 'Our regional network means reliable inventory and predictable lead times — even during peak seasons or supply disruptions.' },
  { number: '03', title: 'Quality Graded', body: 'Every pallet leaves our facility inspected and graded to spec. Custom grading standards available on contract accounts.' },
  { number: '04', title: 'Full-Service Program', body: 'New, recycled, repaired, and retrieval — we manage your entire pallet pool so you can focus on your core business.' },
]

export default function About() {
  return (
    <section id="about" className="py-section-padding px-gutter bg-surface">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-start">
        <div className="flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">Why Choose MGP</span>
          <h2 className="font-headline-lg text-headline-lg text-primary">Built on reliability</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Family-run from Fontana, California with 20+ years serving the Inland Empire. We build the backbone of California’s supply chain — one pallet at a time.</p>
        </div>
        <div className="flex flex-col gap-stack-md">
          {reasons.map(({ number, title, body }) => (
            <div key={number} className="flex gap-stack-sm items-start border-l-4 border-primary pl-stack-sm">
              <span className="font-headline-md text-headline-md text-primary text-xl">{number}</span>
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
