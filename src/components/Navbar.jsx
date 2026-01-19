"use client";

import { useEffect, useRef, useState } from "react";
import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import { RxChevronDown } from "react-icons/rx";

export function Navbar (props) {
  const { logo, navLinks, buttons } = {
    ...NavbarDefaults,
    ...props,
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="relume"
      className={`fixed inset-0 bottom-auto z-[999] mx-auto mt-5 flex w-full px-[5%] md:mt-6 lg:mx-[5%] lg:w-auto lg:px-0 transition-all duration-500 ${
        isScrolled ? 'mt-0 md:mt-0' : ''
      }`}
    >
      <div className={`mx-auto flex min-h-16 w-full max-w-xxl items-center justify-between gap-x-4 gap-y-4 border px-5 md:min-h-18 md:px-8 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-navy-700 shadow-luxury'
          : 'bg-cream-50/95 backdrop-blur-sm border-navy-200'
      }`}>
        <a href={logo.url} className="transition-transform duration-300 hover:scale-105 flex items-center gap-2">
          <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-cream-50' : 'text-navy-900'}`}>
            The <span className="text-gold-500">Residence</span>
          </span>
        </a>
        <button
          ref={buttonRef}
          className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <motion.span
            className={`my-[3px] h-0.5 w-6 transition-colors duration-300 ${isScrolled ? 'bg-cream-50' : 'bg-navy-900'}`}
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={topLineVariants}
          />
          <motion.span
            className={`my-[3px] h-0.5 w-6 transition-colors duration-300 ${isScrolled ? 'bg-cream-50' : 'bg-navy-900'}`}
            animate={isMobileMenuOpen ? "open" : "closed"}
            variants={middleLineVariants}
          />
          <motion.span
            className={`my-[3px] h-0.5 w-6 transition-colors duration-300 ${isScrolled ? 'bg-cream-50' : 'bg-navy-900'}`}
            animate={isMobileMenuOpen ? ["open", "rotatePhase"] : "closed"}
            variants={bottomLineVariants}
          />
        </button>
        <motion.div
          variants={{
            open: { height: "var(--height, 100vh)" },
            close: { height: "auto" },
          }}
          initial="close"
          exit="close"
          animate={isMobileMenuOpen ? "open" : "close"}
          className="absolute left-0 right-0 top-full w-full overflow-hidden lg:static lg:left-auto lg:right-auto lg:top-auto lg:w-auto lg:overflow-visible lg:[--height:auto]"
        >
          <motion.div
            variants={{
              open: { y: 0 },
              close: { y: "var(--translate-y, -100%)" },
            }}
            animate={isMobileMenuOpen ? "open" : "close"}
            initial="close"
            exit="close"
            transition={{ duration: 0.3 }}
            className="absolute left-0 right-0 top-0 mx-auto min-w-[200px] justify-self-center px-[5%] text-center lg:static lg:inset-auto lg:mx-0 lg:px-0 lg:text-left lg:[--translate-y:0%]"
          >
            <div
              ref={menuRef}
              className={`flex w-full flex-col border border-t-0 p-5 md:p-8 lg:w-auto lg:flex-row lg:border-none lg:bg-transparent lg:p-0 ${
                isScrolled
                  ? 'bg-navy-900 border-navy-700'
                  : 'bg-cream-50 border-navy-200'
              }`}
            >
              {navLinks.map((navLink, index) =>
                navLink.subMenuLinks && navLink.subMenuLinks.length > 0 ? (
                  <SubMenu key={index} navLink={navLink} isMobile={isMobile} isScrolled={isScrolled} />
                ) : (
                  <a
                    key={index}
                    href={navLink.url}
                    className={`relative block py-3 text-center text-md font-medium lg:px-4 lg:py-2 lg:text-left lg:text-base transition-colors duration-300 hover:text-gold-500 ${
                      isScrolled ? 'text-cream-100' : 'text-navy-800'
                    }`}
                  >
                    {navLink.title}
                  </a>
                ),
              )}
              <div className="rt-4 mt-4 flex flex-col items-center gap-4 lg:ml-8 lg:mt-0 lg:flex-row">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    {...button}
                    className={`w-full transition-all duration-300 ${
                      index === 0
                        ? 'border-navy-700 hover:border-gold-500 hover:text-gold-500'
                        : 'bg-gradient-to-r from-gold-500 to-gold-600 text-navy-950 hover:from-gold-400 hover:to-gold-500 shadow-gold-glow'
                    }`}
                  >
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const SubMenu = ({ navLink, isMobile, isScrolled }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => !isMobile && setIsDropdownOpen(true)}
      onMouseLeave={() => !isMobile && setIsDropdownOpen(false)}
    >
      <button
        className={`flex w-full items-center justify-center gap-4 py-3 text-left text-md font-medium lg:flex-none lg:justify-start lg:gap-2 lg:px-4 lg:py-2 lg:text-base transition-colors duration-300 hover:text-gold-500 ${
          isScrolled ? 'text-cream-100' : 'text-navy-800'
        }`}
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <span>{navLink.title}</span>
        <motion.span
          variants={{
            rotated: { rotate: 180 },
            initial: { rotate: 0 },
          }}
          animate={isDropdownOpen ? "rotated" : "initial"}
          transition={{ duration: 0.3 }}
          className="text-gold-500"
        >
          <RxChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.nav
            animate={isDropdownOpen ? "open" : "close"}
            initial="close"
            exit="close"
            variants={{
              open: {
                opacity: "var(--opacity-open, 100%)",
                y: 0,
                visibility: "visible",
                height: "auto",
              },
              close: {
                opacity: "var(--opacity-close, 0)",
                y: "var(--y-close, 0%)",
                visibility: "hidden",
                height: "var(--height, 0)",
              },
            }}
            transition={{ duration: 0.2 }}
            className="bg-navy-900 border border-navy-700 rounded-lg shadow-luxury lg:absolute lg:z-50 lg:p-2 lg:[--y-close:25%] lg:[--height:auto]"
          >
            {navLink.subMenuLinks?.map((navLink, index) => (
              <a
                key={index}
                href={navLink.url}
                className="block py-3 text-center text-cream-100 transition-colors duration-300 hover:text-gold-400 lg:px-4 lg:py-2 lg:text-left lg:text-base"
              >
                {navLink.title}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export const NavbarDefaults = {
  logo: {
    url: "#",
    src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg",
    alt: "Logo image",
  },
  navLinks: [
    { title: "Residences", url: "#" },
    { title: "Smart Home", url: "#" },
    { title: "Amenities", url: "#" },
    {
      title: "Explore",
      url: "#",
      subMenuLinks: [
        { title: "Gallery", url: "#" },
        { title: "Virtual Tour", url: "#" },
        { title: "Floor Plans", url: "#" },
      ],
    },
  ],
  buttons: [
    {
      title: "Contact",
      variant: "secondary",
      size: "sm",
    },
    {
      title: "Book Tour",
      size: "sm",
    },
  ],
};

const topLineVariants = {
  open: {
    translateY: 8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: -45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

const middleLineVariants = {
  open: {
    width: 0,
    transition: { duration: 0.1 },
  },
  closed: {
    width: "1.5rem",
    transition: { delay: 0.3, duration: 0.2 },
  },
};

const bottomLineVariants = {
  open: {
    translateY: -8,
    transition: { delay: 0.1 },
  },
  rotatePhase: {
    rotate: 45,
    transition: { delay: 0.2 },
  },
  closed: {
    translateY: 0,
    rotate: 0,
    transition: { duration: 0.2 },
  },
};

export default Navbar;
