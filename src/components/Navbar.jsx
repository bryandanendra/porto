import React, { useState } from "react";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // tidak diperlukan lagi
import Hamburger from 'hamburger-react'; // import hamburger-react
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "Tools", path: "#stack" },
  { title: "Contact", path: "#contact" },
];

// Animasi untuk menu slide dari kanan
const menuVariants = {
  initial: {
    x: "100%",
  },
  enter: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
      when: "afterChildren",
      staggerChildren: 0.05,
    }
  }
};

// Animasi untuk link
const linkVariants = {
  initial: {
    y: 30,
    opacity: 0
  },
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1]
    }
  },
  exit: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  const toggleNav = () => {
    setNav(!nav);
  };

  const closeNav = () => {
    setNav(false);
  };

  return (
    <div className="z-50 fixed flex justify-center w-full text-white font-bold">
      <div
        className="border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl 
                            hidden md:flex items-center justify-center p-2 max-w-[400px] mx-auto"
      >
        <ul className="flex flex-row p-2 space-x-8">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a
                href={link.path}
                className="transform hover:skew-x-12 hover:text-white/50 
                                                                transition-all duration-300 ease-in-out"
              >
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="md:hidden absolute top-5 right-14 border rounded
                             z-50 text-white/70 border-white/70 p-2 cursor-pointer"
      >
        <Hamburger 
          toggled={nav} 
          toggle={setNav} 
          direction="right" 
          duration={0.5}
          size={25}
        />
      </div>

      <AnimatePresence mode="wait">
        {nav && (
          <motion.div
            className="fixed right-0 top-0 w-full h-full backdrop-blur-lg bg-black/90 z-40"
            variants={menuVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <motion.ul className="flex flex-col items-center space-y-8">
                {navLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    variants={linkVariants}
                    className="overflow-hidden"
                  >
                    <a 
                      href={link.path} 
                      onClick={closeNav} 
                      className="text-5xl hover:text-white/50 transition-colors duration-300"
                    >
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
