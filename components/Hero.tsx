export default function Hero() {
  return (
    <section className="bg-inverse-surface text-on-primary py-section-padding px-gutter relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-inverse-surface to-transparent z-10" />
      <img alt="Industrial pallets in warehouse" className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4GXvX9qqTaSttiyOyClbby-S5SXPhpu3svTTWbKMn0M4hX-yTV4_YV-L_-ANP6AO_7LD2TnEFC5IIH0MBZsyIg_jzLrbDxdt7gvOf2_jnar5ydqK_wY7U1M3lU2TetjB04KVt4vr3AZPuUFBd700frJp5oOAgSEne8wKSIS1NjYMDtGqDzO-HaA8DS9C_phCcrPr6hZEtIYI8SHNkUzg9MzMLIg1wrhhj9pqm1FKpLHtV2D_V9Ntx8p7165RVey0hY0YS5NKThQ" />
      <div className="max-w-container-max mx-auto relative z-20 flex flex-col gap-stack-lg">
        <div className="max-w-3xl flex flex-col gap-stack-sm">
          <span className="inline-flex items-center self-start border border-primary-fixed-dim/60 rounded-full px-4 py-1.5 font-label-caps text-[12px] uppercase tracking-[0.16em] text-primary-fixed-dim">ISPM-15 Certified · FSC Member</span>
          <h1 className="font-headline-xl text-headline-xl uppercase">The Gold Standard in Industrial Pallet Solutions</h1>
          <p className="font-body-lg text-body-lg text-surface-container-high max-w-2xl">The Inland Empire’s leader in reliable, sustainable, and heavy-duty logistics foundations. MGP supplies new, recycled, repaired and custom wood pallets to warehouses, manufacturers, and distributors — backed by a commitment to sustainable forestry.</p>
        </div>
        <div className="flex gap-stack-sm flex-wrap">
          <a href="#quote" className="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary-container transition-colors shadow-[4px_4px_0_0_theme(colors.surface-tint)] no-underline">Get a Quote</a>
          <a href="#products" className="border-2 border-on-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-surface hover:text-inverse-surface transition-colors no-underline">View Products</a>
        </div>
      </div>
    </section>
  )
}
