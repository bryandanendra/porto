import React, { useState } from "react";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Hamburger from 'hamburger-react';
import { motion, AnimatePresence } from "framer-motion";
import navbarNoise from "../assets/navbar-noise.svg";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "Tools", path: "#stack" },
  { title: "Contact", path: "#contact" },
];

// Animasi untuk container menu
const containerVariants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.05
    }
  }
};

// Animasi untuk menu overlay (bentuk kurva)
const overlayVariants = {
  initial: { 
    clipPath: 'circle(0% at 95% 5%)' 
  },
  enter: { 
    clipPath: 'circle(150% at 95% 5%)',
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: { 
    clipPath: 'circle(0% at 95% 5%)',
    transition: {
      duration: 0.7,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

// Animasi untuk link menu - dari kanan ke kiri
const linkVariants = {
  initial: { 
    x: 100, 
    opacity: 0 
  },
  enter: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

// Animasi untuk teks link - efek reveal/slide
const textVariants = {
  initial: {
    y: "100%"
  },
  enter: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      delay: 0.1
    }
  },
  exit: {
    y: "100%",
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export const SlideNav = () => {
  const [nav, setNav] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const toggleNav = () => {
    setNav(!nav);
    if (!nav) {
      setActiveLink(null);
    }
  };

  const closeNav = () => {
    setNav(false);
  };

  // Style untuk background dengan noise pattern
  const noiseStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage: `url(${navbarNoise})`,
    backgroundRepeat: 'repeat',
    backgroundBlendMode: 'overlay',
  };

  return (
    <div className="z-50 fixed flex justify-center w-full text-white font-bold">
      <div
        className="border border-white/20 mt-8 backdrop-blur-xl bg-black/30 rounded-3xl 
                  hidden md:flex items-center justify-center p-2 max-w-[400px] mx-auto"
      >
        <ul className="flex flex-row p-2 space-x-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                className="transform hover:skew-x-12 hover:text-white/50 
                          transition-all duration-300 ease-in-out text-white"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="md:hidden absolute top-5 right-5 border rounded
                  z-[100] text-white border-white/70 cursor-pointer backdrop-blur-xl bg-black/30 p-1"
      >
        <Hamburger 
          toggled={nav} 
          toggle={toggleNav} 
          direction="right" 
          duration={0.5}
          size={22}
          color="white"
        />
      </div>

      <AnimatePresence mode="wait">
        {nav && (
          <motion.div
            className="fixed inset-0 z-40"
            variants={containerVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <motion.div 
              className="absolute inset-0 backdrop-blur-xl bg-black/50"
              style={noiseStyle}
              variants={overlayVariants}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <motion.ul className="flex flex-col items-end space-y-10 mr-12">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={index}
                      variants={linkVariants}
                      custom={index}
                      className="overflow-hidden"
                      onMouseEnter={() => setActiveLink(index)}
                      onMouseLeave={() => setActiveLink(null)}
                    >
                      <div className="overflow-hidden">
                        <a
                          href={link.path}
                          onClick={closeNav}
                          className="text-5xl text-white hover:text-white/70 transition-colors duration-300 inline-block"
                        >
                          {activeLink === index ? (
                            <SplitText 
                              text={link.title}
                              delay={50}
                              className="text-5xl text-white"
                              textAlign="right"
                              animationFrom={{ opacity: 0, transform: "translate3d(0,20px,0)" }}
                              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                            />
                          ) : (
                            <span>{link.title}</span>
                          )}
                        </a>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlideNav; 