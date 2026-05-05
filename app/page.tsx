import Header from '@/components/Header'
import Hero from '@/components/Hero'
import StatStrip from '@/components/StatStrip'
import Products from '@/components/Products'
import Industries from '@/components/Industries'
import Sustainability from '@/components/Sustainability'
import About from '@/components/About'
import LocationsMap from '@/components/LocationsMap'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatStrip />
        <Products />
        <Industries />
        <Sustainability />
        <About />
        <LocationsMap />
        <QuoteForm />
      </main>
      <Footer />
    </>
  )
}
