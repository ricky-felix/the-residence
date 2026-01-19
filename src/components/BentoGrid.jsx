import { Button } from '@relume_io/relume-ui'
import { RxChevronRight } from 'react-icons/rx'
import { BiMicrophone, BiBoltCircle, BiSun } from 'react-icons/bi'
import { motion } from 'framer-motion'

export function BentoGrid(props) {
  const { tagline, heading, description, cards } = {
    ...BentoGridDefaults,
    ...props,
  }
  return (
    <section
      id="smart-home"
      className="to-cream-100 bg-gradient-to-b from-white px-[5%] py-20 md:py-28 lg:py-36"
    >
      <div className="container">
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
        <div className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {new Array(Math.ceil(cards.length / 2))
            .fill(null)
            .map((_, colIndex) => (
              <div
                key={colIndex}
                className="grid auto-cols-fr grid-cols-1 gap-6 md:gap-8"
              >
                {cards[colIndex * 2] && (
                  <Card {...cards[colIndex * 2]} index={colIndex * 2} />
                )}
                {cards[colIndex * 2 + 1] && (
                  <Card {...cards[colIndex * 2 + 1]} index={colIndex * 2 + 1} />
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}

const Card = ({ index, ...card }) => {
  return (
    <motion.div
      className="group border-cream-300 hover:shadow-luxury hover:border-gold-400 relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-500 hover:-translate-y-2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Gold accent line on hover */}
      <div className="from-gold-500 via-gold-400 to-gold-500 absolute top-0 right-0 left-0 h-1 origin-left scale-x-0 transform bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100" />

      <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
        {card.icon && (
          <div className="mb-6 md:mb-8">
            <div className="from-navy-900 to-navy-800 inline-flex size-14 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg">
              {card.icon}
            </div>
          </div>
        )}
        {card.tagline && (
          <p className="text-gold-600 mb-2 text-sm font-semibold tracking-wider uppercase">
            {card.tagline}
          </p>
        )}
        <h3 className="text-navy-900 mb-4 font-serif text-2xl leading-tight font-bold md:mb-5 md:text-3xl lg:text-3xl">
          {card.heading}
        </h3>
        <p className="text-navy-600 leading-relaxed">{card.description}</p>
        <div className="mt-6 md:mt-8">
          <Button
            {...card.button}
            className="text-gold-600 hover:text-gold-700 group/btn font-semibold transition-colors duration-300"
          >
            <span className="flex items-center gap-2">
              {card.button.title}
              <RxChevronRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </span>
          </Button>
        </div>
      </div>
      {card.image && (
        <div className="flex w-full flex-col items-center justify-center self-start overflow-hidden">
          <img
            src={card.image.src}
            alt={card.image.alt}
            className="w-full transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}
    </motion.div>
  )
}

export const BentoGridDefaults = {
  tagline: 'Smart Home Features',
  heading: 'Experience Intelligent Living',
  description:
    'Explore the cutting-edge smart home features that redefine modern living with seamless technology integration.',
  cards: [
    {
      icon: <BiMicrophone className="text-gold-400 size-7" />,
      heading: 'Voice-Activated Controls',
      description:
        'Effortlessly manage your home environment using simple voice commands with integrated AI assistants.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        alt: 'Smart thermostat climate control',
      },
      heading: 'Intelligent Climate Control',
      description:
        'Maintain the perfect ambiance with AI-powered climate systems that learn your preferences.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
        alt: 'Smart home security camera system',
      },
      heading: 'Advanced Security',
      description:
        'Protect your home with state-of-the-art surveillance systems providing real-time monitoring and alerts.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
    {
      icon: <BiBoltCircle className="text-gold-400 size-7" />,
      heading: 'Smart Energy Management',
      description:
        'Optimize energy consumption with intelligent systems that adapt to your lifestyle automatically.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
    {
      icon: <BiSun className="text-gold-400 size-7" />,
      heading: 'Ambient Lighting',
      description:
        'Create the perfect atmosphere with customizable smart lighting solutions for every mood.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
    {
      image: {
        src: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
        alt: 'Home entertainment system with large TV',
      },
      heading: 'Integrated Entertainment',
      description:
        'Enjoy seamless entertainment with integrated home theater and multi-room audio systems.',
      button: {
        title: 'Learn More',
        variant: 'link',
        size: 'link',
      },
    },
  ],
}

export default BentoGrid
