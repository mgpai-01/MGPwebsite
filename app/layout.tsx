import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wood Pallets Fontana CA | Manufacturing Green Products',
  description:
    'MGP supplies new, recycled & custom wood pallets in Fontana, CA. ISPM-15 certified, FSC member. Serving warehouses, manufacturers & distributors across the Inland Empire. Get a quote today.',
  keywords: [
    'pallets Fontana CA',
    'wood pallets Fontana',
    'pallet company Fontana California',
    'new pallets Inland Empire',
    'recycled pallets Fontana',
    'custom pallets San Bernardino County',
    'ISPM-15 pallets California',
    'heat treated pallets Fontana',
    'pallet supplier Southern California',
    'Manufacturing Green Products',
    'pallet supplier Fontana',
    'pallets Ontario CA',
    'pallets Rancho Cucamonga',
    'pallets San Bernardino',
  ],
  openGraph: {
    title: 'Manufacturing Green Products | Pallet Supplier in Fontana, CA',
    description:
      'New, recycled, and custom wood pallets for warehouses, manufacturers, and distributors in Fontana, CA and the Inland Empire.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Manufacturing Green Products',
  alternateName: 'MGP Pallets',
  description:
    'MGP supplies new, recycled, and custom wood pallets to warehouses, manufacturers, and distributors in Fontana, CA and surrounding areas. ISPM-15 certified and FSC member.',
  url: 'https://mgpallets.com',
  telephone: '(909) 827-1438',
  email: 'mgp@palletmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '8386 Sultana Avenue',
    addressLocality: 'Fontana',
    addressRegion: 'CA',
    postalCode: '92335',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 34.0922,
    longitude: -117.435,
  },
  areaServed: [
    { '@type': 'City', name: 'Fontana' },
    { '@type': 'City', name: 'San Bernardino' },
    { '@type': 'City', name: 'Ontario' },
    { '@type': 'City', name: 'Rancho Cucamonga' },
    { '@type': 'City', name: 'Riverside' },
    { '@type': 'City', name: 'Colton' },
    { '@type': 'City', name: 'Rialto' },
    { '@type': 'City', name: 'Los Angeles' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pallet Products & Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'New Pallets',
          description: 'GMA Standard 48"×40", custom sizing, HT/MB certified, any wood species',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Recycled Pallets',
          description: 'Grade A & B recycled pallets, sorted by size, high volume supply',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Repaired Pallets',
          description: 'On-site pickup, fast turnaround, graded to spec, volume discounts',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Custom & Specialty Pallets',
          description: 'CAD-ready design, block or stringer, chemical-resistant coatings, private label stamping',
        },
      },
    ],
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
