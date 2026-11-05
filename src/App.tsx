import { SiteProvider } from './store.tsx'
import Nav from './components/Nav.tsx'
import Hero from './components/Hero.tsx'
import AppMockup from './components/AppMockup.tsx'
import SitePlan from './components/SitePlan.tsx'
import Units from './components/Units.tsx'
import Apartment from './components/Apartment.tsx'
import Payment from './components/Payment.tsx'
import Location from './components/Location.tsx'
import Terrace from './components/Terrace.tsx'
import Ask from './components/Ask.tsx'
import Visit from './components/Visit.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <SiteProvider>
      <Nav />
      <main>
        <Hero />
        <AppMockup />
        <SitePlan />
        <Units />
        <Apartment />
        <Payment />
        <Location />
        <Terrace />
        <Ask />
        <Visit />
      </main>
      <Footer />
    </SiteProvider>
  )
}
