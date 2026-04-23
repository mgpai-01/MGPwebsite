const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '50K+', label: 'Pallets per Month' },
  { value: '100%', label: 'Sustainably Sourced' },
  { value: '48hr', label: 'Turnaround' },
]

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: '#1c3325',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* Left Column */}
      <div
        style={{
          padding: '140px 64px 100px 80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Certification Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1.5px solid #6a9e78',
              borderRadius: '100px',
              padding: '7px 18px',
              marginBottom: '32px',
            }}
          >
            <span
              className="font-condensed font-bold uppercase"
              style={{ fontSize: '12px', letterSpacing: '0.16em', color: '#6a9e78' }}
            >
              ISPM-15 Certified · FSC Member
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-condensed font-black text-white"
            style={{
              fontSize: 'clamp(48px, 5.5vw, 84px)',
              lineHeight: '1.0',
              marginBottom: '24px',
            }}
          >
            Your Trusted
            <br />
            Pallet Partner
          </h1>

          {/* Subtext */}
          <p
            className="font-sans"
            style={{
              fontSize: '18px',
              lineHeight: '1.75',
              color: 'rgba(255,255,255,.65)',
              fontWeight: 300,
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            MGP supplies new, recycled, and custom wood pallets to warehouses, manufacturers,
            and distributors — backed by a commitment to sustainable forestry.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="#quote"
              className="font-condensed font-bold uppercase"
              style={{
                backgroundColor: '#2a6b40',
                color: '#fff',
                fontSize: '16px',
                letterSpacing: '0.05em',
                padding: '14px 32px',
                borderRadius: '9px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Request a Quote
            </a>
            <a
              href="#products"
              className="font-condensed font-bold uppercase"
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                fontSize: '16px',
                letterSpacing: '0.05em',
                padding: '14px 32px',
                borderRadius: '9px',
                border: '1.5px solid rgba(255,255,255,.3)',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              View Products
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.12)',
            paddingTop: '36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div
                className="font-condensed font-black"
                style={{ fontSize: '36px', color: '#6a9e78', lineHeight: '1' }}
              >
                {value}
              </div>
              <div
                className="font-condensed font-bold uppercase"
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,.4)',
                  letterSpacing: '0.08em',
                  marginTop: '4px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column — Photo Placeholder */}
      <div
        style={{
          padding: '100px 80px 100px 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '520px',
            backgroundColor: '#e8e2d9',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Replace with: <Image src="/hero-photo.jpg" alt="MGP pallet yard" fill style={{ objectFit: 'cover', borderRadius: '16px' }} /> */}
          <span
            className="font-condensed font-bold uppercase"
            style={{ color: '#6b7b6e', fontSize: '14px', letterSpacing: '0.1em' }}
          >
            Photo Coming Soon
          </span>
        </div>
      </div>
    </section>
  )
}
