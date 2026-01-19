import React from 'react'

import { Navbar } from '../components/Navbar.jsx'
import { Hero } from '../components/Hero.jsx'
import { BentoGrid } from '../components/BentoGrid.jsx'
import { Residence } from '../components/Residence.jsx'
import { Amenities } from '../components/Amenities.jsx'
import { Location } from '../components/Location.jsx'
import { CTA } from '../components/CTA.jsx'
import { Footer } from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <Residence />
        <Amenities />
        <Location />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
