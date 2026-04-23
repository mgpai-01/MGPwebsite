import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Industries from '@/components/Industries'
import About from '@/components/About'
import Sustainability from '@/components/Sustainability'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id="products">
          <Products />
        </section>
        <section id="industries">
          <Industries />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="sustainability">
          <Sustainability />
        </section>
        <section id="quote">
          <QuoteForm />
        </section>
      </main>
      <Footer />
    </>
  )
}
