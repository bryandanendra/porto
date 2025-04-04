import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import premiereProIcon from "../assets/images/premiere-pro.png";
import afterEffectsIcon from "../assets/images/after-effects.png";
import davinciResolveIcon from "../assets/images/DaVinci_Resolve_17_logo.png";
import capcutIcon from "../assets/images/capcut-icon.png";
import ScrollFloat from "../blocks/TextAnimations/ScrollFloat/ScrollFloat";

const stackItems = [
  {
    id: 1,
    icon: <img src={premiereProIcon} alt="Premiere Pro" className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain" />,
    color: "text-blue-500",
  },
  {
    id: 2,
    icon: <img src={afterEffectsIcon} alt="After Effects" className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain" />,
    color: "text-purple-500",
  },
  {
    id: 3,
    icon: <img src={davinciResolveIcon} alt="DaVinci Resolve" className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain" />,
    color: "text-orange-500",
  },
  {
    id: 4,
    icon: <img src={capcutIcon} alt="CapCut" className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 object-contain" />,
    color: "text-cyan-400",
  },
];

export const Stack = () => {
  const controls = useAnimation();

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <section
      className="py-16 md:py-24 lg:py-64 max-w-[1200px] mx-auto text-center px-6 md:px-4"
      id="stack"
    >
      <div className="text-4xl sm:text-6xl md:text-7xl text-gray-100 font-bold mb-10 md:mb-16 lg:mb-20 mx-auto">
        <ScrollFloat containerClassName="inline-block" textClassName="text-white text-5xl md:text-6xl">Editing Tools</ScrollFloat>
      </div>
      <div className="flex flex-wrap justify-center gap-5 md:gap-8 pt-2" ref={ref}>
        {stackItems.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: (index) => ({
                opacity: 0,
                y: index % 2 === 0 ? -100 : 100,
              }),
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5,
                },
              },
            }}
            className="bg-white/10 flex items-center justify-center w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] md:w-[150px] md:h-[150px] rounded-xl p-2 sm:p-3 md:p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
