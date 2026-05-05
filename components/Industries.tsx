const industries = [
  'Food & Beverage',
  'Retail',
  'Automotive',
  'Agriculture',
  'Pharma',
  'Building Materials',
  '3PL/Logistics',
  'Manufacturing',
]

export default function Industries() {
  return (
    <section id="industries" className="py-section-padding px-gutter bg-primary-container text-on-primary-container">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row gap-stack-lg items-center">
        <div className="md:w-1/3 flex flex-col gap-stack-sm text-on-primary">
          <h2 className="font-headline-lg text-headline-lg">Industries We Serve</h2>
          <p className="font-body-md text-body-md opacity-90">From food-grade requirements to heavy industrial loads, MGP delivers the right pallet solution across every sector of the supply chain.</p>
        </div>
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-stack-sm w-full">
          {industries.map((name) => (
            <div key={name} className="industry-pill border border-on-primary/30 py-stack-sm px-unit text-center text-on-primary font-label-caps text-label-caps uppercase bg-primary-container hover:bg-primary cursor-default">{name}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
