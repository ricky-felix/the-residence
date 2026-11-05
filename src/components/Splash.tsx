import { useLayoutEffect, useRef } from 'react'
import { gsap, MOTION_OK } from '../lib/motion'
import './Splash.css'

interface Props {
  onDone: () => void
}

/** Opening screen: brand reveal and a short accent bar, then the panel lifts away.
    Shown once per session, and never shown under reduced motion (see App). */
export default function Splash({ onDone }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let cancelled = false
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ paused: true, onComplete: onDone })
      t.from('.splash__word', { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.08 })
        .from('.splash__tag', { scale: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.3')
        .from('.splash__meta', { autoAlpha: 0, y: 8, duration: 0.5 }, '-=0.2')
        .fromTo('.splash__bar-fill', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power2.inOut' }, '<')
        .to('.splash__inner', { autoAlpha: 0, y: -24, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .to(root.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, '-=0.1')
      // Wait for the web fonts so the brand does not swap mid-animation.
      document.fonts.ready.then(() => {
        if (!cancelled) t.play()
      })
    }, root)
    // Safety net: if fonts or GSAP stall, never trap the visitor behind the splash.
    const mm = gsap.matchMedia()
    let fallback = 0
    mm.add(MOTION_OK, () => {
      fallback = window.setTimeout(onDone, 6000)
    })
    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      mm.revert()
      ctx.revert()
    }
  }, [onDone])

  return (
    <div ref={root} className="splash" role="status" aria-label="The Residence 2.0, loading">
      <div className="splash__inner">
        <p className="splash__brand">
          <span className="splash__mask"><span className="splash__word">The</span></span>{' '}
          <span className="splash__mask"><span className="splash__word">Residence</span></span>
          <span className="splash__tag">2.0</span>
        </p>
        <p className="splash__meta">Smart homes in Medan</p>
        <div className="splash__bar" aria-hidden="true">
          <span className="splash__bar-fill" />
        </div>
      </div>
    </div>
  )
}
