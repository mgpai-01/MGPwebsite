'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import KirkVideo from '@/components/KirkVideo'
import { useT } from '@/lib/i18n'

export default function KirkGibsonPage() {
  const { t } = useT()
  const p = t.kirkPage

  return (
    <>
      <Header />
      <main>
        {/* Hero — the dismantler loop sits inside the hero block so the
            headline and the machine read as one unit. */}
        {/* No tall top padding here: globals.css already offsets body by
            88px (72px mobile) to clear the fixed header, so anything more
            double-counts it and leaves a band of dead space. */}
        <section className="pt-12 md:pt-16 pb-stack-md px-gutter bg-surface">
          <div className="max-w-container-max mx-auto flex flex-col gap-stack-md">
            <a href="/" className="font-label-caps text-label-caps uppercase text-primary hover:underline self-start">
              ← {p.backToHome}
            </a>
            <div className="flex flex-col gap-stack-sm max-w-3xl">
              <span className="font-label-caps text-label-caps uppercase text-primary tracking-[0.16em]">{p.eyebrow}</span>
              <h1 className="font-headline-xl text-headline-xl uppercase text-on-surface">{p.title}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{p.tagline}</p>
            </div>
            <KirkVideo
              caption={p.videoCaption}
              pauseLabel={p.videoPause}
              playLabel={p.videoPlay}
            />
          </div>
        </section>

        {/* Story */}
        <section className="py-section-padding px-gutter bg-surface-container-low">
          <div className="max-w-container-max mx-auto">
            <div className="max-w-3xl flex flex-col gap-stack-md">
              <h2 className="font-headline-lg text-headline-lg text-primary">{p.storyHeading}</h2>
              <div className="flex flex-col gap-stack-sm">
                {p.storyParagraphs.map((para, i) => (
                  <p key={i} className="font-body-lg text-body-lg text-on-surface-variant">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How Kirk works */}
        <section className="py-section-padding px-gutter bg-surface">
          <div className="max-w-container-max mx-auto flex flex-col gap-stack-lg">
            <h2 className="font-headline-lg text-headline-lg text-primary text-center">{p.howHeading}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
              {p.howSteps.map((step, i) => (
                <div key={step.title} className="border border-outline-variant bg-surface-container-lowest p-stack-md flex flex-col gap-stack-sm">
                  <span className="font-headline-md text-headline-md text-primary text-2xl">0{i + 1}</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface text-xl">{step.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why "Kirk Gibson" */}
        <section className="py-section-padding px-gutter bg-surface-container-low">
          <div className="max-w-container-max mx-auto">
            <div className="max-w-3xl flex flex-col gap-stack-sm">
              <h2 className="font-headline-lg text-headline-lg text-primary">{p.namedAfterHeading}</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">{p.namedAfterBody}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-section-padding px-gutter bg-inverse-surface text-on-primary">
          <div className="max-w-container-max mx-auto flex flex-col gap-stack-md items-start max-w-3xl">
            <h2 className="font-headline-lg text-headline-lg text-on-primary">{p.ctaHeading}</h2>
            <p className="font-body-lg text-body-lg text-surface-container-high">{p.ctaBody}</p>
            <div className="flex gap-stack-sm flex-wrap">
              <a href="/#products" className="bg-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-primary-container transition-colors no-underline">
                {p.ctaProductsLabel}
              </a>
              <a href="/#quote" className="border-2 border-on-primary text-on-primary px-stack-md py-stack-sm font-label-caps text-label-caps uppercase hover:bg-on-primary hover:text-inverse-surface transition-colors no-underline">
                {p.ctaQuoteLabel}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
