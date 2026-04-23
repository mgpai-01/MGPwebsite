const industries = [
  { name: 'Food & Beverage', emoji: '🥩' },
  { name: 'Retail & eCommerce', emoji: '📦' },
  { name: 'Automotive', emoji: '🔧' },
  { name: 'Agriculture', emoji: '🌾' },
  { name: 'Pharmaceutical', emoji: '💊' },
  { name: 'Building Materials', emoji: '🏗' },
  { name: '3PL / Logistics', emoji: '🚚' },
  { name: 'Manufacturing', emoji: '🏭' },
]

export default function Industries() {
  return (
    <div style={{ backgroundColor: '#2a6b40', padding: '96px 40px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '56px',
            alignItems: 'end',
          }}
        >
          <div>
            <p
              className="font-condensed font-bold uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.16em',
                color: 'rgba(255,255,255,.5)',
                marginBottom: '8px',
              }}
            >
              Industries Served
            </p>
            <h2
              className="font-condensed font-black text-white"
              style={{
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: '1.05',
                margin: 0,
              }}
            >
              We serve
              <br />
              every sector
            </h2>
          </div>
          <p
            className="font-sans"
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,.6)',
              lineHeight: '1.7',
              fontWeight: 300,
              textAlign: 'right',
              margin: 0,
            }}
          >
            From food-grade requirements to heavy industrial loads, MGP delivers the right pallet
            solution for your specific industry needs.
          </p>
        </div>

        {/* Industry Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {industries.map(({ name, emoji }) => (
            <div
              key={name}
              className="industry-pill"
              style={{
                backgroundColor: 'rgba(255,255,255,.06)',
                borderRadius: '12px',
                padding: '24px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '24px', lineHeight: '1' }}>{emoji}</span>
              <span
                className="font-condensed font-bold text-white"
                style={{ fontSize: '17px' }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
