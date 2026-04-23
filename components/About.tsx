const reasons = [
  {
    number: '01',
    title: 'Sustainable Sourcing',
    body: 'All lumber is sourced from certified sustainable forests. We maintain full chain-of-custody documentation for every load.',
  },
  {
    number: '02',
    title: 'Consistent Supply',
    body: 'Our regional network means reliable inventory and predictable lead times — even during peak seasons or supply disruptions.',
  },
  {
    number: '03',
    title: 'Quality Graded',
    body: 'Every pallet leaves our facility inspected and graded to spec. Custom grading standards available on contract accounts.',
  },
  {
    number: '04',
    title: 'Full-Service Program',
    body: 'New, recycled, repaired, and retrieval — we manage your entire pallet pool so you can focus on your core business.',
  },
]

export default function About() {
  return (
    <div style={{ backgroundColor: '#f0ede6', padding: '96px 40px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
          }}
        >
          {/* Left */}
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
              Why Choose MGP
            </p>
            <h2
              className="font-condensed font-black"
              style={{
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: '1.05',
                color: '#1c2b1e',
                marginBottom: '48px',
              }}
            >
              Built on reliability
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {reasons.map(({ number, title, body }) => (
                <div key={number} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(42,107,64,0.09)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  >
                    <span
                      className="font-condensed font-black"
                      style={{ fontSize: '13px', color: '#2a6b40' }}
                    >
                      {number}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="font-condensed font-black"
                      style={{
                        fontSize: '20px',
                        color: '#1c2b1e',
                        marginBottom: '6px',
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: '15px',
                        color: '#6b7b6e',
                        lineHeight: '1.7',
                        fontWeight: 300,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Photo Placeholder */}
          <div
            style={{
              height: '520px',
              backgroundColor: '#e8e2d9',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="font-condensed font-bold uppercase"
              style={{ color: '#6b7b6e', fontSize: '14px', letterSpacing: '0.1em' }}
            >
              Photo Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
