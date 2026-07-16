import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CalendlyEmbed from '@/components/CalendlyEmbed'

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
      <main className="bg-surface px-gutter py-section-padding">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
          <div className="sched-in flex max-w-2xl flex-col gap-stack-sm">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary">
              Appointments
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary">Schedule an Appointment</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pick a time that works for you — a consultation, a site visit, or a pickup. Choose a
              slot below and you&rsquo;ll get a confirmation with all the details.
            </p>
          </div>

          {/* Calendly inline embed with branded loading state */}
          <CalendlyEmbed url={embedUrl} />

          <p className="sched-in sched-in-3 font-body-md text-body-md text-on-surface-variant">
            Prefer to talk now? Call{' '}
            <a href="tel:+19098271438" className="text-primary hover:underline">
              (909) 827-1438
            </a>{' '}
            or email{' '}
            <a href="mailto:mgp@palletmail.com" className="text-primary hover:underline">
              mgp@palletmail.com
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
