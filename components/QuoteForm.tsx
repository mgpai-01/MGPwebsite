'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', productType: '', quantity: '', notes: '', website: '' })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Submit failed')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submit failed')
    } finally {
      setBusy(false)
    }
  }

  const inputCls = 'w-full bg-surface-container-lowest border border-outline-variant px-stack-sm py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors'
  const labelCls = 'block font-label-caps text-[12px] uppercase tracking-[0.10em] text-on-primary/60 mb-2'

  return (
    <section id="quote" className="py-section-padding px-gutter bg-inverse-surface text-on-primary">
      <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-start">
        <div className="flex flex-col gap-stack-sm">
          <span className="font-label-caps text-label-caps uppercase text-primary-fixed-dim tracking-[0.16em]">Get Started</span>
          <h2 className="font-headline-lg text-headline-lg text-on-primary">Request a Quote</h2>
          <p className="font-body-md text-body-md text-surface-container-high">Tell us about your pallet needs and we’ll get back to you within one business day with pricing and availability.</p>
          <div className="flex flex-col gap-stack-sm mt-stack-sm">
            {[
              { icon: '📞', text: '(909) 827-1438' },
              { icon: '✉️', text: 'mgp@palletmail.com' },
              { icon: '📍', text: '8386 Sultana Ave, Fontana, CA 92335 (Home Base)' },
              { icon: '📍', text: '14619 Merrill Ave, Fontana, CA 92335' },
              { icon: '📍', text: '1326 W Citrus St, Riverside, CA 92507' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-3">
                <span className="text-lg leading-tight">{icon}</span>
                <span className="font-body-md text-body-md text-surface-container-high">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-stack-md">
          {submitted ? (
            <div className="text-center py-stack-lg">
              <div className="w-16 h-16 bg-primary-fixed-dim/30 mx-auto mb-stack-sm flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#92d6a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-primary mb-2">Thank You!</h3>
              <p className="font-body-md text-body-md text-surface-container-high">We’ve received your request and will be in touch within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-stack-sm">
              {/* honeypot */}
              <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div><label className={labelCls}>Name *</label><input className={inputCls} required name="name" value={form.name} onChange={handleChange} placeholder="Your name" /></div>
              <div><label className={labelCls}>Company *</label><input className={inputCls} required name="company" value={form.company} onChange={handleChange} placeholder="Company name" /></div>
              <div><label className={labelCls}>Email *</label><input className={inputCls} required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" /></div>
              <div><label className={labelCls}>Phone</label><input className={inputCls} type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" /></div>
              <div><label className={labelCls}>Product Type</label><select className={inputCls} name="productType" value={form.productType} onChange={handleChange}><option value="">Select product type</option><option>New Pallets</option><option>Recycled Pallets</option><option>Repaired Pallets</option><option>Custom / Specialty</option></select></div>
              <div><label className={labelCls}>Estimated Quantity</label><select className={inputCls} name="quantity" value={form.quantity} onChange={handleChange}><option value="">Select quantity</option><option>Under 100</option><option>100–500</option><option>500–2,000</option><option>2,000–10,000</option><option>10,000+</option></select></div>
              <div className="md:col-span-2"><label className={labelCls}>Additional Notes</label><textarea className={inputCls} rows={4} name="notes" value={form.notes} onChange={handleChange} placeholder="Tell us about your specific requirements, delivery location, or any other details…" /></div>
              {error && <div className="md:col-span-2 text-error-container font-body-md text-[14px]">{error}</div>}
              <div className="md:col-span-2"><button type="submit" disabled={busy} className="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary-container transition-colors shadow-[4px_4px_0_0_theme(colors.surface-tint)] disabled:opacity-60">{busy ? 'Sending…' : 'Send Request'}</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
