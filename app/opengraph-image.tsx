import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Manufacturing Green Products — Industrial Pallet Solutions'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'linear-gradient(135deg, #1c3325 0%, #2a6b40 60%, #6a9e78 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#ffffff',
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              background: '#92d6a1',
              borderRadius: '999px',
            }}
          />
          ISPM-15 · WPA Director · Woodpack Global
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              fontSize: '36px',
              fontWeight: 700,
              opacity: 0.92,
              lineHeight: 1.1,
            }}
          >
            Manufacturing Green Products
          </div>
          <div
            style={{
              fontSize: '78px',
              fontWeight: 900,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              maxWidth: '900px',
            }}
          >
            The pallet standard in supply chain solutions
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              opacity: 0.95,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span>45+ Years · Fontana, CA</span>
            <span style={{ opacity: 0.7, fontSize: '20px', fontWeight: 400 }}>
              New · Recycled · Repaired · Custom · On-Site Service
            </span>
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              opacity: 0.9,
              padding: '12px 24px',
              border: '2px solid #ffffff',
              borderRadius: '8px',
            }}
          >
            manufacturinggreenproducts.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
