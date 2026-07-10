import type { Metadata } from 'next'
import PresentDeck from '@/components/PresentDeck'

export const metadata: Metadata = {
  title: 'Presentation Mode',
  description:
    'Auto-scrolling showcase of Manufacturing Green Products — built for trade shows, mixers, and events.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/present' },
}

export default function PresentPage() {
  return <PresentDeck />
}
