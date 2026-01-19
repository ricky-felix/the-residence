import { Button } from '@relume_io/relume-ui'
import { RxChevronRight } from 'react-icons/rx'
import { motion } from 'framer-motion'

export function Residence(props) {
  const { tagline, heading, description, cards } = {
    ...ResidenceDefaults,
    ...props,
  }
  return (
    <section
      id="relume"
      className="bg-navy-900 relative overflow-hidden px-[5%] py-20 md:py-28 lg:py-36"
    >
      {/* Decorative elements */}
      <div className="bg-gold-500/5 absolute top-0 left-0 h-96 w-96 rounded-full blur-3xl" />
      <div className="bg-gold-500/5 absolute right-0 bottom-0 h-96 w-96 rounded-full blur-3xl" />

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
            <p className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase">
              {tagline}
            </p>
            <span className="bg-gold-500 h-px w-8" />
          </div>
          <h2 className="text-cream-50 mb-6 font-serif text-4xl font-bold md:mb-8 md:text-5xl lg:text-6xl">
            {heading}
          </h2>
          <p className="text-navy-200 text-lg">{description}</p>
        </motion.div>
        <div className="grid auto-cols-fr grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const Card = ({ index, ...card }) => {
  return (
    <motion.div
      className="group bg-navy-800/50 border-navy-700 hover:border-gold-500/50 relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Image container with overlay */}
      <div className="relative flex w-full flex-col items-center justify-center self-start overflow-hidden">
        <img
          src={card.image.src}
          alt={card.image.alt}
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay from top */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold tracking-wider uppercase"
            style={{ color: '#facc15' }}
          >
            {card.tagline}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
        <h2 className="text-cream-50 group-hover:text-gold-400 mb-4 font-serif text-2xl leading-tight font-bold transition-colors duration-300 md:mb-5 md:text-3xl lg:text-3xl">
          {card.heading}
        </h2>
        <p className="text-navy-200 leading-relaxed">{card.description}</p>

        {/* Features list */}
        <ul className="mt-6 space-y-2">
          {card.features?.map((feature, idx) => (
            <li
              key={idx}
              className="text-navy-300 flex items-center gap-2 text-sm"
            >
              <span
                className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: '#d4af37' }}
              />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Button
            {...card.button}
            className="text-gold-400 hover:text-gold-300 group/btn inline-flex items-center gap-2 font-semibold transition-all duration-300"
          >
            <span>{card.button.title}</span>
            <RxChevronRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>

      {/* Hover accent */}
      <div className="from-gold-500 via-gold-400 to-gold-500 absolute right-0 bottom-0 left-0 h-1 scale-x-0 transform bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  )
}

export const ResidenceDefaults = {
  tagline: 'Property Types',
  heading: 'Explore Our Residence Options',
  description:
    'Discover a curated selection of residence types designed to suit your lifestyle and elevate your living experience.',
  cards: [
    {
      tagline: 'Essential',
      image: {
        src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
        alt: 'Modern 2-bedroom apartment living room',
      },
      heading: '2-Bedroom Apartments',
      description:
        'Thoughtfully designed spaces with spacious living areas and premium modern amenities.',
      features: [
        'Smart home integration',
        'Premium finishes',
        'Private balcony',
      ],
      button: {
        title: 'View Floor Plans',
        variant: 'link',
        size: 'link',
      },
    },
    {
      tagline: 'Premium',
      image: {
        src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
        alt: 'Spacious 3-bedroom apartment interior',
      },
      heading: '3-Bedroom Apartments',
      description:
        'Expansive layouts offering more space for your family with enhanced luxury features.',
      features: ['Home automation', 'Walk-in closets', 'Gourmet kitchen'],
      button: {
        title: 'View Floor Plans',
        variant: 'link',
        size: 'link',
      },
    },
    {
      tagline: 'Presidential',
      image: {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        alt: 'Luxury penthouse with panoramic city view',
      },
      heading: 'Luxury Penthouses',
      description:
        'Experience the pinnacle of urban living with exclusive top-tier amenities and panoramic views.',
      features: ['Private elevator', 'Rooftop terrace', 'Concierge service'],
      button: {
        title: 'View Floor Plans',
        variant: 'link',
        size: 'link',
      },
    },
  ],
}

export default Residence
