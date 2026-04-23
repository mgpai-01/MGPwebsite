const items = [
  {
    title: 'FSC-Certified Lumber',
    body: 'Forest Stewardship Council certification across our entire supply chain.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2a6b40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8C8 10 5.9 16.17 3.82 19.11a1 1 0 0 0 1.71 1.04C7 18 9 16.3 12 16c0 0 1 2 0 4" />
        <path d="M9 11.85c3.8-2.4 7.2-5.85 9-9.85" />
      </svg>
    ),
  },
  {
    title: 'Zero Landfill Policy',
    body: 'Broken pallets are chipped, recycled, or repurposed — nothing goes to waste.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2a6b40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <polyline points="23 20 23 14 17 14" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
  },
  {
    title: 'Carbon Tracking',
    body: 'We measure and report our Scope 1 & 2 emissions annually.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2a6b40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Local Sourcing',
    body: 'Regional mills reduce transportation emissions and support local economies.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2a6b40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
]

export default function Sustainability() {
  return (
    <div style={{ backgroundColor: '#f0ede6', padding: '96px 40px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Intro Block */}
        <div style={{ maxWidth: '600px', marginBottom: '56px' }}>
          <p
            className="font-condensed font-bold uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.16em',
              color: '#6a9e78',
              marginBottom: '8px',
            }}
          >
            Sustainability
          </p>
          <h2
            className="font-condensed font-black"
            style={{
              fontSize: 'clamp(34px, 4vw, 56px)',
              lineHeight: '1.05',
              color: '#1c2b1e',
              marginBottom: '16px',
            }}
          >
            Manufacturing Green
            <br />
            is more than a name
          </h2>
          <p
            className="font-sans"
            style={{
              fontSize: '17px',
              lineHeight: '1.7',
              color: '#6b7b6e',
              fontWeight: 300,
              margin: 0,
            }}
          >
            Sustainability isn't a marketing claim — it's the foundation of how we source,
            manufacture, and operate every day.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}
        >
          {items.map(({ title, body, icon }) => (
            <div
              key={title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #ece8e0',
                padding: '28px 24px',
                boxShadow: '0 2px 12px rgba(0,0,0,.05)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(42,107,64,0.09)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {icon}
              </div>
              <h3
                className="font-condensed font-black"
                style={{ fontSize: '20px', color: '#1c2b1e', marginBottom: '8px' }}
              >
                {title}
              </h3>
              <p
                className="font-sans"
                style={{
                  fontSize: '14px',
                  color: '#6b7b6e',
                  lineHeight: '1.65',
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
