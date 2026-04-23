'use client'

import { useState, FormEvent, ChangeEvent } from 'react'

const baseInputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#fff',
  border: '1px solid #ddd8d0',
  borderRadius: '9px',
  padding: '12px 14px',
  fontSize: '15px',
  fontFamily: 'var(--font-barlow), sans-serif',
  color: '#1c2b1e',
  outline: 'none',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
}

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#2a6b40'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,107,64,0.13)'
}

function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.currentTarget.style.borderColor = '#ddd8d0'
  e.currentTarget.style.boxShadow = 'none'
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          fontFamily: 'var(--font-barlow-condensed), sans-serif',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.10em',
          color: 'rgba(255,255,255,.55)',
          marginBottom: '7px',
        }}
      >
        {label}
        {required && <span style={{ color: '#6a9e78', marginLeft: '3px' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productType: '',
    quantity: '',
    notes: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Wire to Formspree, HubSpot, or your preferred handler here
    setSubmitted(true)
  }

  return (
    <div style={{ backgroundColor: '#1c3325', padding: '96px 40px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Section Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            marginBottom: '56px',
            alignItems: 'start',
          }}
        >
          <div>
            <p
              className="font-condensed font-bold uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.16em',
                color: '#6a9e78',
                marginBottom: '8px',
              }}
            >
              Get Started
            </p>
            <h2
              className="font-condensed font-black text-white"
              style={{
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: '1.05',
                marginBottom: '16px',
              }}
            >
              Request a quote
            </h2>
            <p
              className="font-sans"
              style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'rgba(255,255,255,.55)',
                fontWeight: 300,
                margin: 0,
              }}
            >
              Tell us about your pallet needs and we'll get back to you within one business day
              with pricing and availability.
            </p>
          </div>

          {/* Contact Details */}
          <div style={{ paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: '📞', text: '(909) 827-1438' },
              { icon: '✉️', text: 'mgp@palletmail.com' },
              { icon: '📍', text: '8386 Sultana Ave, Fontana, CA 92335' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '18px', lineHeight: '1.5' }}>{icon}</span>
                <span
                  className="font-sans"
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,.65)',
                    lineHeight: '1.5',
                    fontWeight: 300,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Panel */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.10)',
            borderRadius: '16px',
            padding: '36px',
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: 'rgba(42,107,64,0.3)',
                  borderRadius: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6a9e78"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                className="font-condensed font-black text-white"
                style={{ fontSize: '32px', marginBottom: '12px' }}
              >
                Thank You!
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: '17px',
                  color: 'rgba(255,255,255,.6)',
                  fontWeight: 300,
                  lineHeight: '1.7',
                  margin: 0,
                }}
              >
                We've received your request and will be in touch within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '20px',
                }}
              >
                <Field label="Name" required>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={baseInputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </Field>

                <Field label="Company" required>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    style={baseInputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    style={baseInputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </Field>

                <Field label="Phone">
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    style={baseInputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </Field>

                <Field label="Product Type">
                  <select
                    name="productType"
                    value={form.productType}
                    onChange={handleChange}
                    style={{ ...baseInputStyle, appearance: 'auto' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option value="">Select product type</option>
                    <option>New Pallets</option>
                    <option>Recycled Pallets</option>
                    <option>Repaired Pallets</option>
                    <option>Custom / Specialty</option>
                  </select>
                </Field>

                <Field label="Estimated Quantity">
                  <select
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    style={{ ...baseInputStyle, appearance: 'auto' }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option value="">Select quantity</option>
                    <option>Under 100</option>
                    <option>100–500</option>
                    <option>500–2,000</option>
                    <option>2,000–10,000</option>
                    <option>10,000+</option>
                  </select>
                </Field>

                {/* Notes — full width */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Additional Notes">
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Tell us about your specific requirements, delivery location, or any other details…"
                      rows={4}
                      style={{ ...baseInputStyle, resize: 'vertical' }}
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </Field>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  type="submit"
                  className="font-condensed font-bold uppercase"
                  style={{
                    backgroundColor: '#2a6b40',
                    color: '#fff',
                    fontSize: '17px',
                    letterSpacing: '0.05em',
                    padding: '15px 40px',
                    borderRadius: '9px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.88')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                >
                  Send Request
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
