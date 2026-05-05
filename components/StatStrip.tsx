const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '50K+', label: 'Pallets Per Month' },
  { value: '100%', label: 'ISPM-15 Compliant' },
  { value: '48hr', label: 'Turnaround' },
]

export default function StatStrip() {
  return (
    <section className="bg-tertiary-fixed text-on-tertiary-fixed py-stack-lg px-gutter border-y-2 border-outline-variant">
      <div className="max-w-container-max mx-auto grid grid-cols-2 md:grid-cols-4 gap-stack-md text-center">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col gap-unit">
            <span className="font-headline-md text-headline-md text-primary">{value}</span>
            <span className="font-label-caps text-label-caps uppercase">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
