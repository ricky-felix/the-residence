'use client'
import { Button } from '@relume_io/relume-ui'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export function CTA(props) {
  const { headers, description, buttons } = {
    ...CTADefaults,
    ...props,
  }
  return (
    <section
      id="contact"
      className="from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden bg-gradient-to-br px-[5%] py-24 md:py-32 lg:py-40"
    >
      {/* Decorative elements */}
      <div className="bg-gold-500/10 absolute top-0 left-1/4 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-gold-500/10 absolute right-1/4 bottom-0 h-96 w-96 rounded-full blur-3xl" />

      {/* Gold accent lines */}
      <div className="via-gold-500/50 absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="via-gold-500/50 absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent" />

      <div className="relative z-10 container">
        <div className="mx-auto w-full max-w-4xl text-center">
          <h1 className="overflow-hidden">
            {headers.map((heading, index) => (
              <motion.span
                key={index}
                initial={{ x: index % 2 === 0 ? '-100%' : '100%', opacity: 0 }}
                whileInView={{ x: '0%', opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  bounce: 0,
                  duration: 1,
                  delay: index * 0.15,
                }}
                className={clsx(
                  'text-cream-50 block font-serif text-5xl font-bold md:text-7xl lg:text-8xl',
                  {
                    'mb-3 md:mb-4': index !== headers.length - 1,
                  }
                )}
              >
                {heading.split(' ').map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={wordIndex % 3 === 1 ? 'text-gradient-gold' : ''}
                  >
                    {word}{' '}
                  </span>
                ))}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="text-navy-200 mx-auto mt-8 max-w-2xl text-lg leading-relaxed md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                {...button}
                className={clsx(
                  'rounded-lg px-8 py-4 text-base font-semibold transition-all duration-300',
                  index === 0
                    ? 'from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-glow bg-gradient-to-r shadow-lg hover:-translate-y-1'
                    : 'border-cream-200/30 text-cream-100 hover:border-gold-400 hover:text-gold-400 border-2 hover:-translate-y-1'
                )}
              >
                {button.title}
              </Button>
            ))}
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="text-center">
              <p className="text-gold-400 text-3xl font-bold md:text-4xl">
                50+
              </p>
              <p className="text-navy-300 text-sm tracking-wider uppercase">
                Units Available
              </p>
            </div>
            <div className="bg-navy-700 h-12 w-px" />
            <div className="text-center">
              <p className="text-gold-400 text-3xl font-bold md:text-4xl">
                2025
              </p>
              <p className="text-navy-300 text-sm tracking-wider uppercase">
                Completion
              </p>
            </div>
            <div className="bg-navy-700 h-12 w-px" />
            <div className="text-center">
              <p className="text-gold-400 text-3xl font-bold md:text-4xl">5★</p>
              <p className="text-navy-300 text-sm tracking-wider uppercase">
                Smart Living
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export const CTADefaults = {
  headers: ['Your Dream Home', 'Awaits You'],
  description:
    'Ready to experience intelligent luxury? Contact us today to schedule a private tour and discover how The Residence will transform your lifestyle.',
  buttons: [
    { title: 'Schedule Private Tour' },
    { title: 'Download Brochure', variant: 'secondary' },
  ],
}

export default CTA
