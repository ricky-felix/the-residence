'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, useMediaQuery } from '@relume_io/relume-ui'
import { AnimatePresence, motion } from 'framer-motion'
import { RxChevronDown, RxHamburgerMenu, RxCross1 } from 'react-icons/rx'

export function Navbar(props) {
  const { logo, navLinks, buttons } = {
    ...NavbarDefaults,
    ...props,
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isMobile = useMediaQuery('(max-width: 991px)')
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen, isMobile])

  return (
    <nav
      id="navbar"
      className={`fixed top-0 right-0 left-0 z-999 px-4 transition-all duration-500 sm:px-[5%] ${
        isScrolled ? 'pt-0' : 'pt-3 sm:pt-4 md:pt-5'
      }`}
    >
      <div
        className={`relative mx-auto flex min-h-14 w-full max-w-7xl items-center justify-between gap-x-3 rounded-lg border px-4 transition-all duration-500 sm:min-h-16 sm:gap-x-4 sm:px-5 md:min-h-18 md:px-8 ${
          isScrolled
            ? 'bg-navy-900/95 border-navy-700 shadow-luxury rounded-none backdrop-blur-md sm:rounded-lg'
            : 'bg-cream-50/95 border-navy-200 backdrop-blur-sm'
        }`}
      >
        <a
          href={logo.url}
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
          <span
            className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-cream-50' : 'text-navy-900'}`}
          >
            The <span className="text-gold-500">Residence</span>
          </span>
        </a>
        <button
          ref={buttonRef}
          className={`relative z-10 -mr-2 flex h-12 w-12 items-center justify-center lg:hidden ${
            isScrolled ? 'text-cream-50' : 'text-navy-900'
          }`}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <RxCross1 className="h-6 w-6" />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" />
          )}
        </button>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-2">
          {navLinks.map((navLink, index) =>
            navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
              <SubMenu
                key={index}
                navLink={navLink}
                isMobile={false}
                isScrolled={isScrolled}
                setMobileMenuOpen={setIsMobileMenuOpen}
              />
            ) : (
              <a
                key={index}
                href={navLink.url}
                className={`hover:text-gold-500 px-4 py-2 text-base font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-cream-100' : 'text-navy-800'
                }`}
              >
                {navLink.title}
              </a>
            )
          )}
          <div className="ml-4 flex items-center gap-3">
            {buttons.map((button, index) => (
              <a key={index} href={button.url}>
                <Button
                  {...button}
                  className={`transition-all duration-300 ${
                    index === 0
                      ? 'border-navy-700 hover:border-gold-500 hover:text-gold-500'
                      : 'from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 shadow-gold-glow bg-gradient-to-r'
                  }`}
                >
                  {button.title}
                </Button>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 left-0 mt-2 px-4 sm:px-[5%] lg:hidden"
            >
              <div
                ref={menuRef}
                className="border-navy-200 flex max-h-[calc(100vh-5rem)] w-full flex-col overflow-y-auto rounded-lg border bg-white p-4 shadow-lg sm:p-5 md:p-6"
              >
                {navLinks.map((navLink, index) =>
                  navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                    <SubMenu
                      key={index}
                      navLink={navLink}
                      isMobile={isMobile}
                      isScrolled={isScrolled}
                      setMobileMenuOpen={setIsMobileMenuOpen}
                    />
                  ) : (
                    <a
                      key={index}
                      href={navLink.url}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="hover:text-gold-500 active:text-gold-600 text-navy-800 block py-3 text-center text-base font-medium transition-colors duration-300"
                    >
                      {navLink.title}
                    </a>
                  )
                )}
                <div className="border-navy-200 mt-4 flex flex-col items-center gap-3 border-t pt-4">
                  {buttons.map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      className="w-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button
                        {...button}
                        className={`w-full text-sm transition-all duration-300 ${
                          index === 0
                            ? 'border-navy-700 text-navy-800 hover:border-gold-500 hover:text-gold-500'
                            : 'from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 shadow-gold-glow bg-gradient-to-r'
                        }`}
                      >
                        {button.title}
                      </Button>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

const SubMenu = ({ navLink, isMobile, isScrolled, setMobileMenuOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLinkClick = () => {
    setIsDropdownOpen(false)
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className={`hover:text-gold-500 flex w-full items-center justify-center gap-2 py-3 text-base font-medium transition-colors duration-300 lg:justify-start lg:px-4 lg:py-2 ${
          isMobile
            ? 'text-navy-800'
            : isScrolled
              ? 'text-cream-100'
              : 'text-navy-800'
        }`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? 'rotated' : 'initial'}
          transition={{ duration: 0.3 }}
          className="text-gold-500"
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`overflow-hidden rounded-lg ${
              isMobile
                ? 'bg-navy-100 mt-1'
                : 'bg-navy-800/95 border-navy-700 shadow-luxury absolute z-50 mt-0 border p-2 backdrop-blur-sm'
            }`}
          >
            {navLink.subMenuLinks?.map((subLink, index) => (
              <a
                key={index}
                href={subLink.url}
                onClick={handleLinkClick}
                className={`block rounded px-4 py-2.5 text-center text-sm transition-colors duration-300 ${
                  isMobile
                    ? 'text-navy-700 hover:bg-navy-200 hover:text-gold-600'
                    : 'text-cream-100 hover:bg-navy-700/50 hover:text-gold-400 lg:text-left'
                }`}
              >
                {subLink.title}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export const NavbarDefaults = {
  logo: {
    url: '#hero',
    src: 'https://d22po4pjz3o32e.cloudfront.net/logo-image.svg',
    alt: 'Logo image',
  },
  navLinks: [
    { title: 'Smart Home', url: '#smart-home' },
    { title: 'Residences', url: '#residences' },
    { title: 'Amenities', url: '#amenities' },
    {
      title: 'Explore',
      url: '#',
      subMenuLinks: [
        { title: 'Gallery', url: '#hero' },
        { title: 'Virtual Tour', url: '#hero' },
        { title: 'Floor Plans', url: '#residences' },
      ],
    },
  ],
  buttons: [
    {
      title: 'Contact',
      variant: 'secondary',
      size: 'sm',
      url: '#location',
    },
    {
      title: 'Book Tour',
      size: 'sm',
      url: '#contact',
    },
  ],
}

export default Navbar
