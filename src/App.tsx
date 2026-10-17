import Header from './components/Header'
import Hero from './components/Hero'
import Couple from './components/Couple'
import Ceremony from './components/Ceremony'
import GiftList from './components/GiftList'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Couple />
        <Ceremony />
        <GiftList />
      </main>
      <Footer />
    </>
  )
}
