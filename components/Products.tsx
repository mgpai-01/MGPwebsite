const products = [
  {
    title: 'New and Custom Specialty Pallets',
    body: 'Custom-built to your exact specifications using sustainably sourced raw materials. Consistent dimensions and reliability for any operation.',
    specs: ['GMA Standard 48″×40″', 'Custom sizing available', 'HT/MB certified', 'Any wood species'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC58pZmIaGXyKalRmmGd7lzOtXaeMMqvrWWgPxOmKTMjaT-cCVv5HHzVuiHJHAJ3UyNZ-Mb6t1hOToPvxkc5QtFIsKEwmwYjt4z9tFpJPpvEu5eccvNeYorkVqkxK0xl0NzLOTBQ9uFUkw-v4PaK9j-XOJNsVil2TH-r5qF72_OWh2b-xr3MPYywxcmaVaGAOmanP_o2AGHLQGGpWIJpJtE5UrRE9FgJIpwUDtkrlBtKEP7SjhaBLdW1wKvdc-U6pNj8zlpouWhcg',
  },
  {
    title: 'Repaired Pallets',
    body: 'Extend the life of your fleet with our rigorous repair and reconditioning program. Reduce waste and lower per-unit cost.',
    specs: ['On-site pickup', 'Fast turnaround', 'Grade to spec', 'Volume discounts'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeGmfZM0iG362m0L7JX18_lBBcdKOJHWK4dXlsoPRL9JbMAMxHCfNwBlJBQeBRxh1LxwwzW1kx9tTAUyjTVvUERGGgfGH1e4mFjpJoiacOcOsrtOYTV3dwOsJ1KOL41qfdHeUarwqha6EsvQJBN6dOCIhcUDgNUcwWn1cBbYvwdURbl1TlSCoTP6C2e_q6_TenMD7HDvGwSZ8FPVHn0J6IipIZ-5436McbJeXhNCgGU-OqU-AmcCmyavvjz3WibL318n7Hs_QZtg',
  },
  {
    title: 'Supply Chain On-Site Management',
    body: 'Mobile repair crews come to your facility — cut downtime, slash transport costs, and keep your fleet rolling without missing a beat.',
    specs: ['Same-day dispatch', 'Trained on-site technicians', 'All grades repaired in place', 'Zero transportation costs'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUecrgoQCMYgVJScPepNVMNI1qnOe5EAcsp9ZUSsKoLIwMhyFlYMcBvyTuPw7UH01QiPBhK5s3Rz7HmiwgkJZYbGcs1u-5OiYeFtbe8VGz_pR5x9idsMrSFb7WPI4ny5F62ZeNSgHiTOmMNqBwrvcHXC2wsq-37Tej-7PVXl6EaR9bE7Gm68xwomuc5IvDaxHbFJcQFGq-6Jl5PHQK43rIxLpZahRyldoV2vRmrG5MtK4abIEsH7vcz8aowGCJE2mnj8dwZKEiVw',
  },
  {
    title: 'Our Automation',
    body: 'AI-powered robotic systems handle stacking, sorting, and quality inspection at machine speed. Higher throughput, tighter tolerances, and consistent output — 24/7, with vision-based QC catching defects no human can spot.',
    specs: ['AI-powered robotics', 'Up to 3× throughput', 'Vision-based quality control', '24/7 lights-out operation'],
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function Products() {
  return (
    <section id="products" className="py-section-padding px-gutter bg-surface">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-sm text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary">Our Pallet Solutions</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Engineered for durability and precision, meeting the exacting standards of modern logistics.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
          {products.map((p) => (
            <div key={p.title} className="product-card border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
              <div className="h-48 bg-surface-container mb-stack-sm overflow-hidden">
                <img alt={p.title} className="w-full h-full object-cover" src={p.img} />
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-2xl">{p.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{p.body}</p>
              <ul className="flex flex-col gap-1.5 mt-1">
                {p.specs.map((s) => (
                  <li key={s} className="font-body-md text-[14px] text-on-surface-variant flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
              <a href="#quote" className="font-label-caps text-label-caps uppercase text-primary border-b-2 border-primary self-start hover:text-primary-container transition-colors pb-1 mt-stack-sm">Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
