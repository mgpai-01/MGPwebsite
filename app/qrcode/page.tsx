import type { Metadata } from 'next'
import QRCode from 'qrcode'

export const metadata: Metadata = {
  title: 'Contact — Moses Macias',
  description: 'Scan to save Moses Macias to your contacts.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/qrcode' },
}

// vCard — scanning this QR prompts the phone to create the contact.
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

export default async function QrCodePage() {
  const qrSvg = await QRCode.toString(VCARD, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#000000', light: '#ffffff' },
  })

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white p-6">
      <div
        className="w-full max-w-[380px] [&>svg]:h-auto [&>svg]:w-full"
        dangerouslySetInnerHTML={{ __html: qrSvg }}
      />
    </div>
  )
}
