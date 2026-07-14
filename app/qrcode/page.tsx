import type { Metadata } from 'next'
import QRCode from 'qrcode'

export const metadata: Metadata = {
  title: 'Contact — Moses Macias',
  description: 'Save Moses Macias, CFO of Manufacturing Green Products, to your contacts.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/qrcode' },
}

const PHONE_DISPLAY = '760-403-3816'
const PHONE_TEL = '+17604033816'
const EMAIL = 'Moses@palletmail.com'
const ADDRESS = '8386 Sultana Ave, Fontana, CA 92335'
const SITE_DISPLAY = 'manufacturinggreenproducts.com'
const SITE_URL = 'https://www.manufacturinggreenproducts.com'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=8386+Sultana+Ave+Fontana+CA+92335'

// vCard mirrored by /public/moses-macias.vcf (kept in sync for the download button).
const VCARD = [
  'BEGIN:VCARD',
  'VERSION:3.0',
  'N:Macias;Moses;;;',
  'FN:Moses Macias',
  'ORG:Manufacturing Green Products',
  'TITLE:Chief Financial Officer',
  'TEL;TYPE=CELL,VOICE:+17604033816',
  'EMAIL;TYPE=INTERNET:Moses@palletmail.com',
  'ADR;TYPE=WORK:;;8386 Sultana Ave;Fontana;CA;92335;USA',
  'URL:https://www.manufacturinggreenproducts.com',
  'END:VCARD',
].join('\n')

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function Row({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-center gap-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef3ee] text-primary">
        {icon}
      </span>
      <div className="min-w-0 text-left">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant/70">{label}</div>
        <div className="text-[15px] font-semibold leading-snug text-on-surface break-words">{value}</div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="block no-underline transition-colors hover:bg-[#f6f8f5] -mx-2 px-2 py-1.5 rounded-lg">
      {inner}
    </a>
  ) : (
    <div className="-mx-2 px-2 py-1.5">{inner}</div>
  )
}

export default async function QrCodePage() {
  const qrSvg = await QRCode.toString(VCARD, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 1,
    color: { dark: '#14261b', light: '#ffffff' },
  })

  return (
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: 'radial-gradient(130% 90% at 50% 18%, #275037 0%, #1a3025 46%, #0f1913 100%)' }}
    >
      <div className="flex min-h-full items-start justify-center p-4 sm:items-center sm:p-6">
        <div className="w-full max-w-[430px] overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Header band */}
          <div className="flex flex-col items-center gap-3 bg-[#1c3325] px-6 pb-7 pt-8 text-center">
            <div className="h-[68px] w-[68px] overflow-hidden rounded-full ring-1 ring-white/15" style={{ borderRadius: '50%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Manufacturing Green Products"
                className="max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
                style={{ position: 'relative', left: '50%', top: '50%', width: '152%', height: '152%' }}
              />
            </div>
            <div className="mt-1">
              <h1 className="font-headline-lg text-[26px] font-bold leading-tight text-white">Moses Macias</h1>
              <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9dc4ab]">Chief Financial Officer</p>
              <p className="mt-0.5 text-[12px] text-white/55">Manufacturing Green Products</p>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-1 px-6 pt-5">
            <Row icon={<PhoneIcon />} label="Mobile" value={PHONE_DISPLAY} href={`tel:${PHONE_TEL}`} />
            <Row icon={<MailIcon />} label="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
            <Row icon={<PinIcon />} label="Address" value={ADDRESS} href={MAPS_URL} />
            <Row icon={<GlobeIcon />} label="Website" value={SITE_DISPLAY} href={SITE_URL} />
          </div>

          {/* QR */}
          <div className="mt-5 flex flex-col items-center gap-3 border-t border-outline-variant/60 px-6 pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant/70">Scan to save my contact</p>
            <div className="relative" style={{ width: 208, height: 208 }}>
              <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              {/* Center logo mark */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-1.5 shadow-sm">
                <div className="h-9 w-9 overflow-hidden" style={{ borderRadius: '50%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo.png"
                    alt=""
                    aria-hidden="true"
                    className="max-w-none object-cover"
                    style={{ position: 'relative', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '152%', height: '152%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="px-6 pb-7 pt-5">
            <a
              href="/moses-macias.vcf"
              download
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-semibold uppercase tracking-[0.1em] text-white no-underline transition-transform hover:scale-[1.02]"
            >
              Save Contact
            </a>
            <p className="mt-3 text-center text-[11px] text-on-surface-variant/60">
              Manufacturing Green Products · Fontana, CA
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
