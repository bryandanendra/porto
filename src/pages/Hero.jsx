import React from "react";
import { motion } from "framer-motion";
import profilepic from "../assets/images/profilepic.png";
import Aurora from "../components/Aurora";
import StarBorder from "../blocks/Animations/StarBorder/StarBorder";
import BlurText from "../blocks/TextAnimations/BlurText/BlurText";
import SplitText from "../blocks/TextAnimations/SplitText/SplitText";
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard";

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
            <div className="relative z-10">
              <div className="w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] md:w-[210px] md:h-[210px] cursor-target">
                <TiltedCard
                  imageSrc={profilepic}
                  altText="Brian Danendra"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  scaleOnHover={1.2}
                  rotateAmplitude={25}
                  showMobileWarning={false}
                  showTooltip={false}
                  imageClassName="rounded-full"
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="w-20 h-12 flex items-center justify-center">
                      <div className="text-white text-base font-bold text-center">
                        <div className="animate-pulse">Hiiii!</div>
                        
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl w-full"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter mb-3 md:mb-4 text-center">
              <div className="flex justify-center w-full mb-2">
                <BlurText text="Hi, I am" className="text-white" />
              </div>
              <div className="flex justify-center w-full cursor-target">
                <BlurText text="Brian Danendra" className="text-blue-400" />
              </div>
            </h1>
            <p className="text-base md:text-xl text-white/80 max-w-lg mx-auto leading-relaxed mb-8">
              <SplitText text="I'm a video editor focused on creating engaging visual content that captivates audiences. With expertise in motion graphics and storytelling, I deliver exceptional experiences that help clients achieve their goals." />
            </p>

            <div className="flex gap-4 justify-center">
              <a href="#contact">
                <StarBorder 
                  color="#4f9fff"
                  speed="4s"
                  className="font-medium hover:scale-105 transition-transform cursor-target"
                  type="button"
                >
                  Contact Me
                </StarBorder>
              </a>
              <motion.a
                className="inline-block cursor-target"
                whileHover={{ scale: 1.05 }}
              >
                <div className="relative inline-block py-[1px] overflow-hidden rounded-[20px] font-medium hover:scale-105 transition-transform">
                  <div className="relative z-10 bg-gradient-to-b from-gray-900 to-black border border-gray-800 text-white rounded-[20px] overflow-hidden" style={{ width: '149px', height: '58px' }}>
                    <img 
                      src="https://media.giphy.com/media/KpACNEh8jXK2Q/giphy.gif" 
                      alt="View Work" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
