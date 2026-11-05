import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap }

/** Motion only runs for people who have not asked their system to reduce it. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Elements revealed once as they scroll into view (everything below the hero). */
const REVEAL = [
  'main section:not(#top) .h2',
  'main section:not(#top) .lead',
  'main section:not(#top) .sheet',
  'main section:not(#top) svg',
].join(', ')

/**
 * Page motion: a one-off hero entrance (played when `ready` turns true, i.e. after the splash)
 * and one-shot scroll reveals. Nothing loops and nothing runs under reduced motion.
 */
export function usePageMotion(ready: boolean) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      const hero = gsap.timeline({ paused: true, defaults: { ease: 'power3.out', duration: 0.9 } })
      hero
        .from('.hero__title', { yPercent: 30, autoAlpha: 0 })
        .from(['.hero__lead', '.hero__ctas'], { y: 24, autoAlpha: 0, stagger: 0.1 }, '-=0.6')
        .from('.hero__panel', { y: 40, autoAlpha: 0, duration: 1.1 }, '-=0.7')
        .from('.nav', { y: -16, autoAlpha: 0, duration: 0.6 }, '<')
      if (ready) hero.play()

      gsap.set(REVEAL, { autoAlpha: 0, y: 32 })
      ScrollTrigger.batch(REVEAL, {
        start: 'top 88%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.08, overwrite: true }),
      })
    })
    return () => mm.revert()
  }, [ready])
}
