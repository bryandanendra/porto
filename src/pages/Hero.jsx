import React from "react";
import { motion } from "framer-motion";
import profilepic from "../assets/images/profilepic.PNG";
import Aurora from "../components/Aurora";
import StarBorder from "../components/StarBorder";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden min-h-screen text-white w-full">
      <div className="absolute inset-0 bg-black">
        <Aurora 
          colorStops={["#2460A7", "#2660e5", "#00d8ff"]} 
          amplitude={1.2}
          blend={0.6}
        />
      </div>

      <div className="relative mx-auto px-4 pt-12 pb-16 w-full max-w-[1400px]">
        <div className="flex flex-col items-center justify-center text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-6 mt-16"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-3xl"></div>
            <img
              src={profilepic}
              alt="Brian Danendra"
              className="w-[140px] sm:w-[170px] md:w-[210px] relative z-10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-3 md:mb-4 text-center">
              Hi, I am
              <br />
              <div className="flex justify-center w-full">
                <BlurText text="Brian Danendra" className="text-blue-400" />
              </div>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-lg mx-auto leading-relaxed mb-8">
              <SplitText text="I'm a video editor specializing in motion graphics, creating engaging visual content that captivates audiences. Delivering exceptional experiences for my clients is at the heart of everything I do." />
            </p>

            <div className="flex gap-4 justify-center">
              <a href="#contact">
                <StarBorder 
                  color="#4f9fff"
                  speed="4s"
                  className="font-medium hover:scale-105 transition-transform"
                  type="button"
                >
                  Contact Me
                </StarBorder>
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 border border-white/20 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                View Work
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
