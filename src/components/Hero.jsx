'use client'

import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@relume_io/relume-ui'
import clsx from 'clsx'
import { FaCirclePlay } from 'react-icons/fa6'
import { CgSpinner } from 'react-icons/cg'
import { motion } from 'framer-motion'

export function Hero(props) {
  const { heading, description, buttons, image, video } = {
    ...HeroDefaults,
    ...props,
  }

  const [isIframeLoaded, setIsIframeLoaded] = useState(false)

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100/50 to-transparent z-0 pointer-events-none" />

      <div className="px-[5%] py-20 md:py-28 lg:py-36 relative z-10">
        <div className="container">
          <div className="flex w-full max-w-2xl flex-col">
            {/* Premium tagline */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
                Premium Smart Living
              </span>
            </motion.div>

            <motion.h1
              className="mb-6 font-serif text-5xl font-bold leading-[1.1] text-navy-900 md:mb-8 md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {heading.split(' ').map((word, index) => (
                <span key={index} className={index === 1 || index === 3 ? 'text-gradient-gold' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg text-navy-600 md:text-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4 md:mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  {...button}
                  className={clsx(
                    'px-8 py-4 text-base font-semibold transition-all duration-300',
                    index === 0
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 shadow-lg hover:shadow-gold-glow hover:-translate-y-1'
                      : 'border-2 border-navy-800 text-navy-800 hover:bg-navy-900 hover:text-cream-50 hover:-translate-y-1'
                  )}
                >
                  {button.title}
                </Button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Section with Premium Overlay */}
      <Dialog>
        <DialogTrigger className="relative flex size-full items-center justify-center group">
          <motion.div
            className="relative w-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="aspect-video size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Navy gradient overlay */}
            <span className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-900/40 to-transparent" />
            {/* Gold accent line */}
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent z-20" />
          </motion.div>

          {/* Play Button */}
          <motion.div
            className="absolute z-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold-500/30 animate-ping" />
              <FaCirclePlay className="relative size-20 text-gold-400 transition-all duration-300 group-hover:text-gold-300 group-hover:scale-110 drop-shadow-lg" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-widest text-cream-50">
              Watch Video
            </span>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="bg-navy-950/95 backdrop-blur-lg border-navy-800">
          {!isIframeLoaded && (
            <CgSpinner className="mx-auto size-16 animate-spin text-gold-400" />
          )}
          <iframe
            className={clsx(
              'z-0 mx-auto aspect-video size-full md:w-[738px] lg:w-[940px] rounded-lg',
              {
                visible: isIframeLoaded,
                hidden: !isIframeLoaded,
              }
            )}
            src={video}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsIframeLoaded(true)}
          ></iframe>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export const HeroDefaults = {
  heading: 'Live Intelligently, Live Exceptionally',
  description:
    'The Residence, kompleks residential smart home pertama di Medan, Indonesia. Experience the future of luxury living with cutting-edge technology seamlessly integrated into every aspect of your home.',
  buttons: [
    {
      title: 'Schedule a Tour',
    },
    {
      title: 'Explore Residences',
      variant: 'secondary',
    },
  ],
  video: 'https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW',
  image: {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    alt: 'Luxury modern residence exterior at dusk',
  },
}

export default Hero
