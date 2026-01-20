import { Button } from '@relume_io/relume-ui'
import React from 'react'
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi'
import { motion } from 'framer-motion'

export function Location(props) {
  const { tagline, heading, description, contacts, map } = {
    ...LocationDefaults,
    ...props,
  }
  return (
    <section
      id="location"
      className="bg-cream-50 px-[5%] py-20 md:py-28 lg:py-36"
    >
      <div className="container">
        <div>
          <div className="mb-12 grid auto-cols-fr grid-cols-1 gap-x-12 gap-y-12 md:mb-20 md:grid-cols-[1fr_.75fr] md:gap-x-20 md:gap-y-16">
            <motion.div
              className="max-w-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <p className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase">
                  {tagline}
                </p>
              </div>
              <h2 className="text-navy-900 mb-6 font-serif text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <p className="text-navy-600 text-lg leading-relaxed">
                {description}
              </p>
            </motion.div>

            <div className="flex flex-col">
              <div className="grid auto-cols-fr grid-cols-1 gap-x-4 gap-y-8 py-2">
                {contacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    className="group flex flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="mr-5 flex-shrink-0">
                      <div className="from-navy-900 to-navy-800 group-hover:shadow-gold-glow flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-shadow duration-300">
                        {React.cloneElement(contact.icon, {
                          className: 'size-5 text-gold-400',
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-navy-900 mb-2 text-lg leading-tight font-bold md:text-xl">
                        {contact.title}
                      </h3>
                      {contact.description && (
                        <p className="text-navy-600">{contact.description}</p>
                      )}
                      {contact.title === 'Office' && contact.button ? (
                        <div className="mt-4">
                          <Button
                            {...contact.button}
                            className="from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-glow rounded-lg bg-gradient-to-r px-6 py-2.5 font-semibold shadow-lg transition-all duration-300"
                          >
                            {contact.button.title}
                          </Button>
                        </div>
                      ) : (
                        contact.link && (
                          <a
                            className="text-gold-600 hover:text-gold-700 border-gold-400/50 hover:border-gold-600 border-b font-medium transition-colors duration-300"
                            href={contact.link.url}
                          >
                            {contact.link.label}
                          </a>
                        )
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <motion.a
          href={map.url}
          className="group shadow-luxury relative block overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={map.image.src}
            alt={map.image.alt}
            className="size-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 md:h-[500px]"
          />
          {/* Overlay */}
          <div className="from-navy-900/60 via-navy-900/20 absolute inset-0 bg-gradient-to-t to-transparent" />

          {/* Location pin indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="bg-gold-500/30 absolute inset-0 animate-ping rounded-full" />
              <div className="from-gold-500 to-gold-600 shadow-gold-glow relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br">
                <BiMap className="text-navy-950 size-8" />
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="absolute right-6 bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-cream-50 text-lg font-semibold">
              View on Google Maps
            </p>
            <p className="text-cream-200 text-sm">Click to get directions</p>
          </div>

          {/* Gold accent line */}
          <div className="via-gold-500 absolute right-0 bottom-0 left-0 h-1 bg-gradient-to-r from-transparent to-transparent" />
        </motion.a>
      </div>
    </section>
  )
}

export const LocationDefaults = {
  tagline: 'Location',
  heading: 'Visit Our Sales Gallery',
  description:
    'Schedule a private viewing and experience the future of smart living. Our dedicated team is ready to guide you through every detail of The Residence.',
  contacts: [
    {
      icon: <BiEnvelope className="size-6" />,
      title: 'Email Us',
      link: {
        label: 'hello@theresidence.id',
        url: 'mailto:hello@theresidence.id',
      },
    },
    {
      icon: <BiPhone className="size-6" />,
      title: 'Call Us',
      link: {
        label: '+62 61 888 9999',
        url: 'tel:+62618889999',
      },
    },
    {
      icon: <BiMap className="size-6" />,
      title: 'Office',
      description: 'Jl. Gatot Subroto No. 123, Medan, Sumatera Utara 20112',
      button: {
        title: 'Get Directions',
      },
    },
  ],
  map: {
    url: 'https://maps.google.com/?q=Medan,Indonesia',
    image: {
      src: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80',
      alt: 'Aerial view of Medan city location',
    },
  },
}

export default Location
