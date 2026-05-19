'use client'

import { useT } from '@/lib/i18n'

const images = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC58pZmIaGXyKalRmmGd7lzOtXaeMMqvrWWgPxOmKTMjaT-cCVv5HHzVuiHJHAJ3UyNZ-Mb6t1hOToPvxkc5QtFIsKEwmwYjt4z9tFpJPpvEu5eccvNeYorkVqkxK0xl0NzLOTBQ9uFUkw-v4PaK9j-XOJNsVil2TH-r5qF72_OWh2b-xr3MPYywxcmaVaGAOmanP_o2AGHLQGGpWIJpJtE5UrRE9FgJIpwUDtkrlBtKEP7SjhaBLdW1wKvdc-U6pNj8zlpouWhcg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDeGmfZM0iG362m0L7JX18_lBBcdKOJHWK4dXlsoPRL9JbMAMxHCfNwBlJBQeBRxh1LxwwzW1kx9tTAUyjTVvUERGGgfGH1e4mFjpJoiacOcOsrtOYTV3dwOsJ1KOL41qfdHeUarwqha6EsvQJBN6dOCIhcUDgNUcwWn1cBbYvwdURbl1TlSCoTP6C2e_q6_TenMD7HDvGwSZ8FPVHn0J6IipIZ-5436McbJeXhNCgGU-OqU-AmcCmyavvjz3WibL318n7Hs_QZtg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBUecrgoQCMYgVJScPepNVMNI1qnOe5EAcsp9ZUSsKoLIwMhyFlYMcBvyTuPw7UH01QiPBhK5s3Rz7HmiwgkJZYbGcs1u-5OiYeFtbe8VGz_pR5x9idsMrSFb7WPI4ny5F62ZeNSgHiTOmMNqBwrvcHXC2wsq-37Tej-7PVXl6EaR9bE7Gm68xwomuc5IvDaxHbFJcQFGq-6Jl5PHQK43rIxLpZahRyldoV2vRmrG5MtK4abIEsH7vcz8aowGCJE2mnj8dwZKEiVw',
  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80',
]

export default function Products() {
  const { t } = useT()
  return (
    <section id="products" className="py-section-padding px-gutter bg-surface">
      <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
        <div className="flex flex-col gap-stack-sm text-center">
          <h2 className="font-headline-lg text-headline-lg text-primary">{t.products.heading}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">{t.products.subheading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
          {t.products.cards.map((p, i) => (
            <div key={p.title} className="product-card border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
              <div className="h-48 bg-surface-container mb-stack-sm overflow-hidden">
                <img alt={p.title} className="w-full h-full object-cover" src={images[i]} />
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
              <a href="#quote" className="font-label-caps text-label-caps uppercase text-primary border-b-2 border-primary self-start hover:text-primary-container transition-colors pb-1 mt-stack-sm">{t.products.learnMore}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
