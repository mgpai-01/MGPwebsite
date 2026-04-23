function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4
        className="font-condensed font-bold uppercase"
        style={{
          fontSize: '12px',
          letterSpacing: '0.12em',
          color: '#6a9e78',
          marginBottom: '16px',
        }}
      >
        {title}
      </h4>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="footer-link font-sans" style={{ fontSize: '14px' }}>
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#141f17', padding: '64px 40px 36px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Column */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  backgroundColor: '#2a6b40',
                  borderRadius: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  className="font-condensed font-black text-white"
                  style={{ fontSize: '12px' }}
                >
                  MGP
                </span>
              </div>
              <div style={{ lineHeight: '1.15' }}>
                <div
                  className="font-condensed font-black text-white"
                  style={{ fontSize: '17px' }}
                >
                  Manufacturing
                </div>
                <div
                  className="font-condensed font-black"
                  style={{ fontSize: '17px', color: '#6a9e78' }}
                >
                  Green Products
                </div>
              </div>
            </div>
            <p
              className="font-sans"
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,.42)',
                lineHeight: '1.7',
                maxWidth: '280px',
                fontWeight: 300,
                margin: 0,
              }}
            >
              Your trusted pallet partner in Fontana, CA. New, recycled, repaired, and custom
              pallets backed by sustainable forestry practices.
            </p>
          </div>

          <FooterColumn
            title="Products"
            links={['New Pallets', 'Recycled Pallets', 'Repaired Pallets', 'Custom & Specialty']}
          />
          <FooterColumn
            title="Company"
            links={['About Us', 'Sustainability', 'Industries Served', 'Get a Quote']}
          />
          <FooterColumn
            title="Contact"
            links={['(555) 000-0000', 'info@mgpallets.com', 'Fontana, CA 92335', 'Mon–Fri 7am–5pm']}
          />
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.08)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            className="font-sans"
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,.3)',
              fontWeight: 300,
              margin: 0,
            }}
          >
            © 2026 Manufacturing Green Products. All rights reserved.
          </p>
          <p
            className="font-condensed font-bold uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.10em',
              color: 'rgba(255,255,255,.3)',
              margin: 0,
            }}
          >
            ISPM-15 Certified · FSC Member
          </p>
        </div>
      </div>
    </footer>
  )
}
