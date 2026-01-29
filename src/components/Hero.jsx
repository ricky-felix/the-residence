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
      <div className="from-cream-50 via-cream-100/50 pointer-events-none absolute inset-0 z-0 bg-gradient-to-b to-transparent" />

      <div className="relative z-10 px-[5%] py-20 md:py-28 lg:py-36">
        <div className="container mx-auto">
          <div className="flex w-full max-w-2xl flex-col">
            {/* Premium tagline */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase">
                Premium Smart Living
              </span>
            </motion.div>

            <motion.h1
              className="text-navy-900 mb-6 font-serif text-5xl leading-[1.1] font-bold md:mb-8 md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {heading.split(' ').map((word, index) => (
                <span
                  key={index}
                  className={
                    index === 1 || index === 3 ? 'text-gradient-gold' : ''
                  }
                >
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-navy-600 text-lg leading-relaxed md:text-xl"
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
                      ? 'from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-glow bg-gradient-to-r shadow-lg hover:-translate-y-1'
                      : 'border-navy-800 text-navy-800 hover:bg-navy-900 hover:text-cream-50 border-2 hover:-translate-y-1'
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
        <DialogTrigger className="group relative flex size-full items-center justify-center">
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
            <span className="from-navy-950/80 via-navy-900/40 absolute inset-0 z-10 bg-gradient-to-t to-transparent" />
            {/* Gold accent line */}
            <span className="via-gold-500 absolute right-0 bottom-0 left-0 z-20 h-1 bg-gradient-to-r from-transparent to-transparent" />
          </motion.div>

          {/* Play Button */}
          <motion.div
            className="absolute z-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
          >
            <div className="relative">
              <div className="bg-gold-500/30 absolute inset-0 animate-ping rounded-full" />
              <FaCirclePlay className="text-gold-400 group-hover:text-gold-300 relative size-20 drop-shadow-lg transition-all duration-300 group-hover:scale-110" />
            </div>
            <span className="text-cream-50 text-sm font-semibold tracking-widest uppercase">
              Watch Video
            </span>
          </motion.div>
        </DialogTrigger>
        <DialogContent className="bg-navy-950/95 border-navy-800 backdrop-blur-lg">
          {!isIframeLoaded && (
            <CgSpinner className="text-gold-400 mx-auto size-16 animate-spin" />
          )}
          <iframe
            className={clsx(
              'z-0 mx-auto aspect-video size-full rounded-lg md:w-[738px] lg:w-[940px]',
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
