'use client'

import { Button, Input } from '@relume_io/relume-ui'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Footer(props) {
  const {
    logo,
    newsletterHeading,
    newsletterDescription,
    inputPlaceholder,
    button,
    termsAndConditions,
    columnLinks,
    footerText,
    socialLinks,
  } = {
    ...Footer6Defaults,
    ...props,
  }

  const [emailInput, setEmailInput] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({
      emailInput,
    })
  }

  return (
    <footer id="footer" className="bg-navy-950 text-cream-100">
      {/* Newsletter Section */}
      <div className="border-navy-800 border-b px-[5%] py-16 md:py-20">
        <div className="container">
          <div className="lg:flex lg:items-center lg:justify-between">
            <motion.div
              className="mb-8 lg:mb-0 lg:max-w-md"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-cream-50 mb-2 font-serif text-2xl font-bold md:text-3xl">
                {newsletterHeading}
              </h2>
              <p className="text-navy-300">{newsletterDescription}</p>
            </motion.div>
            <motion.div
              className="max-w-md lg:min-w-[25rem]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                className="mb-4 flex flex-col gap-3 sm:flex-row sm:gap-4"
                onSubmit={handleSubmit}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder={inputPlaceholder}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-navy-900 border-navy-700 text-cream-50 placeholder:text-navy-400 focus:border-gold-500 rounded-lg pl-4"
                />
                <Button
                  {...button}
                  className="from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 hover:shadow-gold-glow rounded-lg bg-gradient-to-r px-6 py-3 font-semibold whitespace-nowrap shadow-lg transition-all duration-300"
                >
                  {button.title}
                </Button>
              </form>
              <div
                className="text-navy-400 text-xs"
                dangerouslySetInnerHTML={{ __html: termsAndConditions }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-[5%] py-12 md:py-16">
        <div className="container">
          {/* Links Grid */}
          <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 md:mb-16 lg:grid-cols-6">
            {columnLinks.map((column, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-start justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-gold-400 mb-4 text-sm font-semibold tracking-wider uppercase">
                  {column.title}
                </h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        className="text-navy-300 hover:text-gold-400 text-sm transition-colors duration-300"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="via-navy-700 mb-8 h-px w-full bg-gradient-to-r from-transparent to-transparent" />

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <motion.a
              href={logo.url}
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-cream-50 font-serif text-2xl font-bold tracking-tight">
                The <span className="text-gold-400">Residence</span>
              </span>
            </motion.a>

            {/* Social Links */}
            {socialLinks && (
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="bg-navy-800 text-navy-300 hover:bg-gold-500 hover:text-navy-950 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}

            <p className="text-navy-400 text-sm">{footerText}</p>
          </div>
        </div>
      </div>

      {/* Gold accent line at very bottom */}
      <div className="from-navy-900 via-gold-500 to-navy-900 h-1 bg-gradient-to-r" />
    </footer>
  )
}

export const Footer6Defaults = {
  logo: {
    url: '#hero',
    src: 'https://d22po4pjz3o32e.cloudfront.net/logo-image.svg',
    alt: 'The Residence logo',
  },
  newsletterHeading: 'Stay Informed',
  newsletterDescription:
    'Subscribe to receive exclusive updates, smart home insights, and priority access to new releases.',
  inputPlaceholder: 'Enter your email',
  button: {
    title: 'Subscribe',
    variant: 'secondary',
    size: 'sm',
  },
  termsAndConditions: `
  <p>
    By subscribing you agree to our
    <a href='#' class='underline text-gold-500 hover:text-gold-400'>Privacy Policy</a>.
  </p>
  `,
  columnLinks: [
    {
      title: 'Residences',
      links: [
        { title: '2-Bedroom', url: '#residences' },
        { title: '3-Bedroom', url: '#residences' },
        { title: 'Penthouses', url: '#residences' },
        { title: 'Floor Plans', url: '#residences' },
      ],
    },
    {
      title: 'Smart Home',
      links: [
        { title: 'Features', url: '#smart-home' },
        { title: 'Technology', url: '#smart-home' },
        { title: 'Security', url: '#smart-home' },
        { title: 'Energy', url: '#smart-home' },
      ],
    },
    {
      title: 'Amenities',
      links: [
        { title: 'Clubhouse', url: '#amenities' },
        { title: 'Co-Working', url: '#amenities' },
        { title: 'Playground', url: '#amenities' },
        { title: 'EV Charging', url: '#amenities' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { title: 'Virtual Tour', url: '#hero' },
        { title: 'Gallery', url: '#hero' },
        { title: 'Location', url: '#location' },
        { title: 'FAQs', url: '#contact' },
      ],
    },
    {
      title: 'Company',
      links: [
        { title: 'About Us', url: '#hero' },
        { title: 'Careers', url: '#contact' },
        { title: 'Press', url: '#contact' },
        { title: 'Contact', url: '#location' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', url: '#' },
        { title: 'Terms of Service', url: '#' },
        { title: 'Cookie Policy', url: '#' },
        { title: 'Disclaimer', url: '#' },
      ],
    },
  ],
  footerText: '© 2026 The Residence. All rights reserved.',
}

export default Footer
