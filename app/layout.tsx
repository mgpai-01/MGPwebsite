import type { Metadata } from 'next'
import { Public_Sans, Work_Sans, Manrope } from 'next/font/google'
import './globals.css'
import { LanguageProvider, HtmlLangScript } from '@/lib/i18n'
import { en } from '@/lib/i18n/dictionaries/en'

const publicSans = Public_Sans({ subsets: ['latin'], weight: ['300','400','700'], variable: '--font-public-sans', display: 'swap' })
const workSans   = Work_Sans({   subsets: ['latin'], weight: ['700','900'],       variable: '--font-work-sans',   display: 'swap' })
const manrope    = Manrope({     subsets: ['latin'], weight: ['600','700','800'],  variable: '--font-manrope',     display: 'swap' })

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
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es': '/',
      'zh-CN': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'Manufacturing Green Products',
    title: 'Manufacturing Green Products | Industrial Pallet Solutions Fontana CA',
    description: 'New, recycled, repaired & custom wood pallets. 45+ years serving the Inland Empire. ISPM-15 certified · WPA Director · Woodpack Global Member.',
    locale: 'en_US',
    alternateLocale: ['es_MX', 'zh_CN'],
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Manufacturing Green Products — Industrial Pallet Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manufacturing Green Products | Pallet Solutions Fontana CA',
    description: '45+ years building the backbone of California’s supply chain. New, recycled, repaired, and custom wood pallets.',
    images: ['/opengraph-image'],
  },
  other: {
    'geo.region': 'US-CA',
    'geo.placename': 'Fontana',
    'geo.position': '34.0922;-117.435',
    'ICBM': '34.0922, -117.435',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: en.faq.items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const services = [
  {
    name: 'New Wood Pallets',
    description: 'Custom-built new wood pallets using sustainably sourced lumber. GMA standard 48"×40" and fully custom dimensions. HT/MB certified for international export.',
  },
  {
    name: 'Recycled Pallets',
    description: 'Inspected, graded, and re-stacked recycled wood pallets. Lower cost than new, full inventory consistency, available in standard GMA and custom sizes.',
  },
  {
    name: 'Repaired Pallets',
    description: 'Pallet repair and reconditioning to extend fleet life. Same-day pickup available across the Inland Empire. Grade-to-spec output for contract accounts.',
  },
  {
    name: 'Custom & Specialty Pallets',
    description: 'Engineered to your exact specifications. Heavy-duty, food-grade, export-ready, or unusual dimensions — any wood species, any deck pattern.',
  },
  {
    name: 'On-Site Pallet Pool Management',
    description: 'Full pallet supply and maintenance program at your facility. Inventory upkeep, ongoing replenishment, and on-site repair crews available when needed.',
  },
]

const serviceSchemas = services.map((s, i) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE}/#service-${i}`,
  serviceType: s.name,
  name: s.name,
  description: s.description,
  provider: { '@id': `${SITE}/#business` },
  areaServed: ['Fontana','Riverside','San Bernardino','Ontario','Rancho Cucamonga','Colton','Rialto','Los Angeles'].map((c) => ({ '@type': 'City', name: c })),
}))

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE}/#organization`,
  name: 'Manufacturing Green Products',
  alternateName: 'MGP Pallets',
  url: SITE,
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png`, width: 512, height: 512 },
  foundingDate: '1980',
  foundingLocation: { '@type': 'Place', name: 'Fontana, California, USA' },
  knowsAbout: ['Wood Pallets', 'Pallet Recycling', 'ISPM-15 Heat Treatment', 'Supply Chain Logistics', 'Sustainable Forestry'],
  memberOf: [
    { '@type': 'Organization', name: 'Western Pallet Association' },
    { '@type': 'Organization', name: 'Woodpack Global' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${publicSans.variable} ${workSans.variable} ${manrope.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        {serviceSchemas.map((s, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))}
        <HtmlLangScript />
      </head>
      <body className="bg-background text-on-background antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
