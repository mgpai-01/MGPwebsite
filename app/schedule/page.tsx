import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScheduleContent from '@/components/ScheduleContent'

export const metadata: Metadata = {
  title: 'Schedule an Appointment',
  description:
    'Book a consultation, site visit, or pickup with Manufacturing Green Products — Fontana, CA pallet supplier.',
  alternates: { canonical: '/schedule' },
}

// Moses's Calendly booking link.
const CALENDLY_URL = 'https://calendly.com/moses-palletmail/30min'

export default function SchedulePage() {
  const embedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=2a6b40`

  return (
    <>
      {/* Open the connection to Calendly early so the widget loads faster. */}
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://calendly.com" />
      <Header />
      <ScheduleContent embedUrl={embedUrl} />
      <Footer />
    </>
  )
}
