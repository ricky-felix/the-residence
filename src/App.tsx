import { useCallback, useEffect, useState } from 'react'
import { SiteProvider } from './store.tsx'
import { prefersReducedMotion, usePageMotion } from './lib/motion.ts'
import Splash from './components/Splash.tsx'
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

const SEEN_KEY = 'residence:splash-seen'

function shouldShowSplash(): boolean {
  if (prefersReducedMotion()) return false
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const [splash, setSplash] = useState(shouldShowSplash)
  const onSplashDone = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Storage blocked: the splash simply shows again next visit.
    }
    setSplash(false)
  }, [])

  useEffect(() => {
    if (!splash) return
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [splash])

  usePageMotion(!splash)

  return (
    <SiteProvider>
      {splash && <Splash onDone={onSplashDone} />}
      <div className="page" inert={splash}>
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
      </div>
    </SiteProvider>
  )
}
