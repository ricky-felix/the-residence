'use client'

import { Button } from '@relume_io/relume-ui'
import { useMotionValue, motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RxChevronRight } from 'react-icons/rx'
import clsx from 'clsx'
import React from 'react'

const calculateScales = (totalSections, scrollYProgress) => {
  return Array.from({ length: totalSections }, (_, index) => {
    const sectionFraction = 1 / totalSections
    const start = sectionFraction * index
    const end = sectionFraction * (index + 1)

    return index < totalSections - 1
      ? useTransform(scrollYProgress, [start, end], [1, 0.8])
      : useMotionValue(1)
  })
}

export function Amenities(props) {
  const { tagline, heading, description, featureSections } = {
    ...AmenitiesDefaults,
    ...props,
  }

  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end 60%'],
  })

  const scales = calculateScales(featureSections.length, scrollYProgress)

  return (
    <section
      id="amenities"
      className="from-navy-50 via-navy-100/50 to-cream-50 relative overflow-hidden bg-gradient-to-b px-[5%] py-20 md:py-28 lg:py-36"
    >
      {/* Decorative background elements */}
      <div className="bg-gold-500/5 absolute top-20 left-0 h-72 w-72 rounded-full blur-3xl" />
      <div className="bg-navy-200/30 absolute right-0 bottom-40 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-gold-400/5 absolute top-1/2 left-1/4 h-64 w-64 rounded-full blur-2xl" />

      <div className="relative z-10 container">
        <motion.div
          className="mx-auto mb-16 w-full max-w-2xl text-center md:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="bg-gold-500 h-px w-8" />
            <p className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase">
              {tagline}
            </p>
            <span className="bg-gold-500 h-px w-8" />
          </div>
          <h2 className="text-navy-900 mb-6 font-serif text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-navy-600 text-lg">{description}</p>
        </motion.div>
        <div
          ref={containerRef}
          className="sticky top-0 grid grid-cols-1 gap-8 md:gap-0"
        >
          {featureSections.map((featureSection, index) => (
            <FeatureSection
              key={index}
              {...featureSection}
              scale={scales[index]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const FeatureSection = ({ scale, index, ...featureSection }) => {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className="border-cream-300 md:shadow-luxury grid grid-cols-1 content-center overflow-hidden rounded-2xl border bg-white shadow-lg md:sticky md:top-[10%] md:mb-[10vh] md:h-[80vh] md:grid-cols-2"
      style={{ scale }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <FeatureSectionContent isEven={isEven} {...featureSection} />
    </motion.div>
  )
}

const FeatureSectionContent = ({ isEven, ...featureSection }) => (
  <React.Fragment>
    <div
      className={clsx(
        'order-first flex flex-col justify-center p-8 md:p-12 lg:p-16',
        isEven ? 'md:order-first' : 'md:order-last'
      )}
    >
      {/* Decorative element */}
      <div className="mb-6 flex items-center gap-3">
        <div className="from-gold-500 to-gold-400 h-1 w-12 rounded-full bg-gradient-to-r" />
      </div>

      <p className="text-gold-600 mb-3 text-sm font-semibold tracking-[0.15em] uppercase">
        {featureSection.tagline}
      </p>
      <h2 className="text-navy-900 mb-6 font-serif text-3xl leading-[1.2] font-bold md:mb-8 md:text-4xl lg:text-5xl">
        {featureSection.heading}
      </h2>
      <p className="text-navy-600 text-lg leading-relaxed">
        {featureSection.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10">
        {featureSection.buttons.map((button, index) => (
          <Button
            key={index}
            {...button}
            className={clsx(
              'transition-all duration-300',
              index === 0
                ? 'bg-navy-900 text-cream-50 hover:bg-navy-800 rounded-lg px-6 py-3'
                : 'text-gold-600 hover:text-gold-700 font-semibold'
            )}
          >
            {index === 0 ? (
              button.title
            ) : (
              <span className="flex items-center gap-2">
                {button.title}
                <RxChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
    <div
      className={clsx(
        'relative order-last flex flex-col items-center justify-center overflow-hidden',
        isEven ? 'md:order-last' : 'md:order-first'
      )}
    >
      <div className="relative h-full w-full">
        <img
          src={featureSection.image.src}
          alt={featureSection.image.alt}
          className="h-full w-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="from-navy-900/20 absolute inset-0 bg-gradient-to-t to-transparent" />
        {/* Gold accent line */}
        <div
          className={clsx(
            'from-gold-500 via-gold-400 to-gold-500 absolute top-0 bottom-0 w-1 bg-gradient-to-b',
            isEven ? 'left-0' : 'right-0'
          )}
        />
      </div>
    </div>
  </React.Fragment>
)

export const AmenitiesDefaults = {
  tagline: 'Amenities & Facilities',
  heading: 'World-Class Amenities',
  description:
    'Discover a range of exceptional amenities designed to enhance your living experience and elevate everyday moments.',
  featureSections: [
    {
      tagline: 'Social Hub',
      heading: 'Modern Clubhouse',
      description:
        'Explore our state-of-the-art clubhouse featuring a premium fitness center, elegant lounge areas, and versatile event spaces designed for residents who appreciate the finer things in life.',
      buttons: [
        { title: 'Explore Clubhouse', variant: 'secondary' },
        {
          title: 'View Gallery',
          variant: 'link',
          size: 'link',
        },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
        alt: 'Modern fitness center with gym equipment',
      },
    },
    {
      tagline: 'Productivity',
      heading: 'Co-Working Spaces',
      description:
        'Find your productivity zone in our dedicated co-working spaces, equipped with high-speed fiber internet, private meeting rooms, and comfortable workstations designed for the modern professional.',
      buttons: [
        { title: 'Tour Spaces', variant: 'secondary' },
        {
          title: 'Learn More',
          variant: 'link',
          size: 'link',
        },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
        alt: 'Modern co-working office space',
      },
    },
    {
      tagline: 'Family Life',
      heading: 'Children Playground',
      description:
        'The comfort and happiness of your children is our priority. Our dedicated playground area offers a safe, supervised, and fun environment for kids to play, learn, and make lasting friendships.',
      buttons: [
        { title: 'See Facilities', variant: 'secondary' },
        {
          title: 'Safety Features',
          variant: 'link',
          size: 'link',
        },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=1200&q=80',
        alt: 'Children playing on modern playground equipment',
      },
    },
    {
      tagline: 'Sustainability',
      heading: 'EV Charging Stations',
      description:
        'Elevate your electric vehicle experience with our convenient Tesla-compatible charging stations. Embrace sustainable living without compromising on convenience or luxury.',
      buttons: [
        { title: 'View Stations', variant: 'secondary' },
        {
          title: 'Green Initiative',
          variant: 'link',
          size: 'link',
        },
      ],
      image: {
        src: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80',
        alt: 'Electric vehicle charging at station',
      },
    },
  ],
}

export default Amenities
