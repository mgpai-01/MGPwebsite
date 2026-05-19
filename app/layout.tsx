import type { Metadata } from 'next'
import { Public_Sans, Work_Sans } from 'next/font/google'
import './globals.css'
import { LanguageProvider, HtmlLangScript } from '@/lib/i18n'

const publicSans = Public_Sans({ subsets: ['latin'], weight: ['300','400','700'], variable: '--font-public-sans', display: 'swap' })
const workSans   = Work_Sans({   subsets: ['latin'], weight: ['700','900'],       variable: '--font-work-sans',   display: 'swap' })

const SITE = 'https://www.manufacturinggreenproducts.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Manufacturing Green Products | Industrial Pallet Solutions in Fontana CA',
    template: '%s | Manufacturing Green Products',
  },
  description:
    'The Inland Empire’s leader in sustainable, heavy-duty wood pallet solutions. New, recycled, repaired, and custom pallets serving Fontana, Riverside, and all of Southern California for 45+ years. ISPM-15 certified · WPA Director · Woodpack Global Member.',
  keywords: [
    'wood pallets Fontana CA','pallet supplier Fontana','pallet company Fontana California',
    'pallets Inland Empire','recycled pallets Fontana','new pallets Fontana','custom pallets San Bernardino County',
    'ISPM-15 pallets California','heat treated pallets Fontana','pallet supplier Southern California',
    'Manufacturing Green Products','pallets Riverside CA','pallets Ontario CA','pallets Rancho Cucamonga',
    'pallets San Bernardino','WPA Western Pallet Association','Woodpack Global pallets',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Manufacturing Green Products',
    title: 'Manufacturing Green Products | Industrial Pallet Solutions Fontana CA',
    description: 'New, recycled, repaired & custom wood pallets. 45+ years serving the Inland Empire. ISPM-15 certified · WPA Director · Woodpack Global Member.',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Manufacturing Green Products — Industrial Pallet Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufacturing Green Products | Pallet Solutions Fontana CA',
    description: '45+ years building the backbone of California’s supply chain. New, recycled, repaired, and custom wood pallets.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  // Replace value below after Search Console gives you a verification code.
  // verification: { google: 'paste-search-console-token-here' },
  category: 'business',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#business`,
  name: 'Manufacturing Green Products',
  alternateName: 'MGP Pallets',
  description: 'Family-run pallet supplier serving Fontana, Riverside, and the Inland Empire for 45+ years. New, recycled, repaired & custom wood pallets. ISPM-15 certified, WPA Director, Woodpack Global Member.',
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: `${SITE}/logo.png`,
  telephone: '(909) 827-1438',
  email: 'mgp@palletmail.com',
  address: { '@type': 'PostalAddress', streetAddress: '8386 Sultana Avenue', addressLocality: 'Fontana', addressRegion: 'CA', postalCode: '92335', addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: 34.0922, longitude: -117.435 },
  location: [
    { '@type': 'Place', name: 'MGP Home Base — Sultana', address: { '@type': 'PostalAddress', streetAddress: '8386 Sultana Ave', addressLocality: 'Fontana', addressRegion: 'CA', postalCode: '92335', addressCountry: 'US' } },
    { '@type': 'Place', name: 'MGP — Merrill Yard',     address: { '@type': 'PostalAddress', streetAddress: '14619 Merrill Ave', addressLocality: 'Fontana', addressRegion: 'CA', postalCode: '92335', addressCountry: 'US' } },
    { '@type': 'Place', name: 'MGP — Riverside Yard',   address: { '@type': 'PostalAddress', streetAddress: '1326 W Citrus St', addressLocality: 'Riverside', addressRegion: 'CA', postalCode: '92507', addressCountry: 'US' } },
  ],
  areaServed: ['Fontana','Riverside','San Bernardino','Ontario','Rancho Cucamonga','Colton','Rialto','Los Angeles'].map((c) => ({ '@type': 'City', name: c })),
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Pallet Products & Services', itemListElement: [
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'New Pallets' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Recycled Pallets' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Repaired Pallets' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom & Specialty Pallets' } },
  ]},
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '06:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '06:00', closes: '15:00' },
  ],
  // Add your social/business profile URLs here when you create them:
  // sameAs: [
  //   'https://www.facebook.com/manufacturinggreenproducts',
  //   'https://www.linkedin.com/company/manufacturing-green-products',
  //   'https://www.google.com/maps?cid=YOUR_GOOGLE_BUSINESS_CID',
  // ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${publicSans.variable} ${workSans.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <HtmlLangScript />
      </head>
      <body className="bg-background text-on-background antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
