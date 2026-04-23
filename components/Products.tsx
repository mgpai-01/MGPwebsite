const products = [
  {
    title: 'New Pallets',
    body: 'Custom-manufactured to your exact specifications, our new pallets deliver consistent dimensions and reliability for any operation.',
    specs: ['GMA Standard 48″×40″', 'Custom sizing available', 'HT/MB certified', 'Any wood species'],
  },
  {
    title: 'Recycled Pallets',
    body: 'Sourced locally and thoroughly inspected, our recycled pallets offer exceptional value without compromising quality or reliability.',
    specs: ['Grade A & B', 'Sorted by size', 'High volume supply', 'Regional sourcing'],
  },
  {
    title: 'Repaired Pallets',
    body: 'We extend the life of damaged pallets through expert repair services, reducing waste and lowering your per-unit cost.',
    specs: ['On-site pickup', 'Fast turnaround', 'Grade to spec', 'Volume discounts'],
  },
  {
    title: 'Custom & Specialty',
    body: 'From chemical-resistant coatings to private label stamping, we build pallets engineered for your unique requirements.',
    specs: ['CAD-ready design', 'Block or stringer', 'Chemical-resistant coatings', 'Private label stamping'],
  },
]

export default function Products() {
  return (
    <div style={{ backgroundColor: '#faf9f6', padding: '96px 40px' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: '56px',
            flexWrap: 'wrap',
            gap: '24px',
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
              Our Products
            </p>
            <h2
              className="font-condensed font-black"
              style={{
                fontSize: 'clamp(34px, 4vw, 56px)',
                lineHeight: '1.05',
                color: '#1c2b1e',
                margin: 0,
              }}
            >
              The right pallet
              <br />
              for every need
            </h2>
          </div>
          <a
            href="#quote"
            className="font-condensed font-bold uppercase"
            style={{
              color: '#2a6b40',
              fontSize: '15px',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Get a Quote →
          </a>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}
        >
          {products.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ title, body, specs }: { title: string; body: string; specs: string[] }) {
  return (
    <div
      className="product-card"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        border: '1px solid #ece8e0',
        overflow: 'hidden',
      }}
    >
      {/* Image Placeholder */}
      <div
        style={{
          height: '180px',
          backgroundColor: '#e8e2d9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Replace with: <Image src="/pallets-[type].jpg" alt={title} width={400} height={180} style={{ objectFit: 'cover' }} /> */}
        <span
          className="font-condensed font-bold uppercase"
          style={{ color: '#6b7b6e', fontSize: '13px', letterSpacing: '0.1em' }}
        >
          Photo
        </span>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Accent Bar */}
        <div
          style={{
            width: '28px',
            height: '3px',
            backgroundColor: '#2a6b40',
            borderRadius: '2px',
            marginBottom: '12px',
          }}
        />

        <h3
          className="font-condensed font-black"
          style={{ fontSize: '22px', color: '#1c2b1e', marginBottom: '10px' }}
        >
          {title}
        </h3>

        <p
          className="font-sans"
          style={{
            fontSize: '13.5px',
            color: '#6b7b6e',
            lineHeight: '1.65',
            marginBottom: '16px',
          }}
        >
          {body}
        </p>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          {specs.map((spec) => (
            <li
              key={spec}
              className="font-sans"
              style={{
                fontSize: '13px',
                color: '#3d5442',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '100px',
                  backgroundColor: '#2a6b40',
                  flexShrink: 0,
                }}
              />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
