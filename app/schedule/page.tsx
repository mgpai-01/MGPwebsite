import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule an Appointment',
  description:
    'Book a consultation, site visit, or pickup with Manufacturing Green Products — Fontana, CA pallet supplier.',
  alternates: { canonical: '/schedule' },
}

// TODO: replace with Moses's real Calendly booking link once the Calendly
// account is set up (e.g. https://calendly.com/moses-mgp/consultation).
const CALENDLY_URL = 'https://calendly.com/mgp-appointments/consultation'

export default function SchedulePage() {
  const embedUrl = `${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=2a6b40`

  return (
    <div className="min-h-screen bg-surface">
      {/* Slim branded top bar (fixed — matches the site's 88px body offset) */}
      <header className="fixed left-0 top-0 z-50 w-full border-b-2 border-outline-variant bg-surface/95 backdrop-blur-sm">
        <div className="max-w-container-max mx-auto flex items-center justify-between px-gutter py-stack-sm">
          <a href="/" className="flex items-center gap-3 no-underline">
            <img
              src="/logo.png"
              alt="Manufacturing Green Products"
              className="h-10 w-10 object-contain md:h-12 md:w-12"
            />
            <div className="hidden leading-[1.02] sm:block">
              <div className="font-headline-md text-base font-black tracking-[-0.01em] text-on-surface">
                Manufacturing
              </div>
              <div className="font-headline-md text-base font-black tracking-[-0.01em] text-primary">
                Green Products
              </div>
            </div>
          </a>
          <a
            href="/#quote"
            className="bg-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase text-on-primary no-underline transition-colors hover:bg-primary-container"
          >
            Get a Quote
          </a>
        </div>
      </header>

      <main className="px-gutter py-section-padding">
        <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
          <div className="flex max-w-2xl flex-col gap-stack-sm">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.16em] text-primary">
              Appointments
            </span>
            <h1 className="font-headline-lg text-headline-lg text-primary">Schedule an Appointment</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Pick a time that works for you — a consultation, a site visit, or a pickup. Choose a
              slot below and you&rsquo;ll get a confirmation with all the details.
            </p>
          </div>

          {/* Calendly inline embed */}
          <div
            className="overflow-hidden border border-outline-variant bg-surface-container-lowest"
            style={{ minHeight: 760 }}
          >
            <iframe
              src={embedUrl}
              title="Schedule an appointment with Manufacturing Green Products"
              className="w-full"
              style={{ height: 760, border: 0 }}
              loading="lazy"
            />
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant">
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
    </div>
  )
}
