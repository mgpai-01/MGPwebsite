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
  // Three locations. The item1./X-ABLabel grouping gives each a custom label
  // (HQ / Merrill Yard / Riverside Yard) that phones display on the saved contact.
  'item1.ADR;TYPE=WORK:;;8386 Sultana Ave;Fontana;CA;92335;USA',
  'item1.X-ABLabel:HQ',
  'item2.ADR;TYPE=WORK:;;14619 Merrill Ave;Fontana;CA;92335;USA',
  'item2.X-ABLabel:Merrill Yard',
  'item3.ADR;TYPE=WORK:;;1326 W Citrus St;Riverside;CA;92507;USA',
  'item3.X-ABLabel:Riverside Yard',
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
