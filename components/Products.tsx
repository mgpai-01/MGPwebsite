const products = [
  {
    title: 'New Pallets',
    body: 'Custom-built to your exact specifications using sustainably sourced raw materials. Consistent dimensions and reliability for any operation.',
    specs: ['GMA Standard 48″×40″', 'Custom sizing available', 'HT/MB certified', 'Any wood species'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC58pZmIaGXyKalRmmGd7lzOtXaeMMqvrWWgPxOmKTMjaT-cCVv5HHzVuiHJHAJ3UyNZ-Mb6t1hOToPvxkc5QtFIsKEwmwYjt4z9tFpJPpvEu5eccvNeYorkVqkxK0xl0NzLOTBQ9uFUkw-v4PaK9j-XOJNsVil2TH-r5qF72_OWh2b-xr3MPYywxcmaVaGAOmanP_o2AGHLQGGpWIJpJtE5UrRE9FgJIpwUDtkrlBtKEP7SjhaBLdW1wKvdc-U6pNj8zlpouWhcg',
  },
  {
    title: 'Recycled Pallets',
    body: 'Cost-effective, environmentally responsible options sourced locally and graded for consistent performance.',
    specs: ['Grade A & B', 'Sorted by size', 'High volume supply', 'Regional sourcing'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeGmfZM0iG362m0L7JX18_lBBcdKOJHWK4dXlsoPRL9JbMAMxHCfNwBlJBQeBRxh1LxwwzW1kx9tTAUyjTVvUERGGgfGH1e4mFjpJoiacOcOsrtOYTV3dwOsJ1KOL41qfdHeUarwqha6EsvQJBN6dOCIhcUDgNUcwWn1cBbYvwdURbl1TlSCoTP6C2e_q6_TenMD7HDvGwSZ8FPVHn0J6IipIZ-5436McbJeXhNCgGU-OqU-AmcCmyavvjz3WibL318n7Hs_QZtg',
  },
  {
    title: 'Repaired Pallets',
    body: 'Extend the life of your fleet with our rigorous repair and reconditioning program. Reduce waste and lower per-unit cost.',
    specs: ['On-site pickup', 'Fast turnaround', 'Grade to spec', 'Volume discounts'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeGmfZM0iG362m0L7JX18_lBBcdKOJHWK4dXlsoPRL9JbMAMxHCfNwBlJBQeBRxh1LxwwzW1kx9tTAUyjTVvUERGGgfGH1e4mFjpJoiacOcOsrtOYTV3dwOsJ1KOL41qfdHeUarwqha6EsvQJBN6dOCIhcUDgNUcwWn1cBbYvwdURbl1TlSCoTP6C2e_q6_TenMD7HDvGwSZ8FPVHn0J6IipIZ-5436McbJeXhNCgGU-OqU-AmcCmyavvjz3WibL318n7Hs_QZtg',
  },
  {
    title: 'Custom & Specialty',
    body: 'Oversized, block, or uniquely engineered crates designed for specialized cargo. Built for your unique requirements.',
    specs: ['CAD-ready design', 'Block or stringer', 'Chemical-resistant coatings', 'Private label stamping'],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj1PENpZY44HogVc_8Ud5mqNGRrz-2K8GT3nIHWklplM0dKoE7ui_iuQuC3iiwul1Rulylx0mVIvBLRYajXPwq2zMrwUUBfkZ1tb3Wxpj8wzAObY42KIXA9Di4cpz7cPzyRioIpIyaqNdTCqe54_lDD9hKIZk5YsioIu7I81lHvR8mBob0MnHco7hCGiV3LdUubBGEs2LEoJ3A3BZdSNlMkpyO0Tu3Qf4yvv96w6w05ovkB5Akc5bhnXpU6y8O3KQ6hNbUJgR1Xg',
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
