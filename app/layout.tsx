import type { Metadata } from 'next'
import { Public_Sans, Work_Sans } from 'next/font/google'
import './globals.css'

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-public-sans',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manufacturing Green Products | Industrial Pallet Solutions Fontana CA',
  description:
    'The Inland Empire’s leader in reliable, sustainable, heavy-duty pallet solutions. New, recycled, repaired & custom pallets serving Fontana, Riverside, and all of Southern California.',
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
    'pallets Riverside CA',
  ],
  openGraph: {
    title: 'Manufacturing Green Products | Pallet Supplier in Fontana, CA',
    description:
      'New, recycled, repaired and custom wood pallets for warehouses, manufacturers, and distributors in Fontana, Riverside and the Inland Empire.',
    type: 'website',
    locale: 'en_US',
  },
  robots: { index: true, follow: true },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Manufacturing Green Products',
  alternateName: 'MGP Pallets',
  description:
    'MGP supplies new, recycled, repaired, and custom wood pallets to warehouses, manufacturers, and distributors in Fontana, CA, Riverside, CA and surrounding areas. ISPM-15 certified and FSC member.',
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
  location: [
    {
      '@type': 'Place',
      name: 'MGP Home Base — Sultana',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '8386 Sultana Ave',
        addressLocality: 'Fontana',
        addressRegion: 'CA',
        postalCode: '92335',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Place',
      name: 'MGP — Merrill Yard',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '14619 Merrill Ave',
        addressLocality: 'Fontana',
        addressRegion: 'CA',
        postalCode: '92335',
        addressCountry: 'US',
      },
    },
    {
      '@type': 'Place',
      name: 'MGP — Riverside Yard',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1326 W Citrus St',
        addressLocality: 'Riverside',
        addressRegion: 'CA',
        postalCode: '92507',
        addressCountry: 'US',
      },
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Fontana' },
    { '@type': 'City', name: 'Riverside' },
    { '@type': 'City', name: 'San Bernardino' },
    { '@type': 'City', name: 'Ontario' },
    { '@type': 'City', name: 'Rancho Cucamonga' },
    { '@type': 'City', name: 'Colton' },
    { '@type': 'City', name: 'Rialto' },
    { '@type': 'City', name: 'Los Angeles' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pallet Products & Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'New Pallets' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Recycled Pallets' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Repaired Pallets' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Product', name: 'Custom & Specialty Pallets' } },
    ],
  },
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '06:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '06:00',
      closes: '15:00',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${publicSans.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-background text-on-background antialiased">{children}</body>
    </html>
  )
}
