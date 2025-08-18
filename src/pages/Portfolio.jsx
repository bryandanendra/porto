import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import proj1 from "../assets/images/tmo-nusantara-tn.jpg";
import proj2 from "../assets/images/overthink-tn.jpg";
import proj3 from "../assets/images/melangkah-tn.jpg";
import proj4 from "../assets/images/smaug-rewind-tn.jpg";
import video1 from "../assets/video/1.mp4";
import video2 from "../assets/video/2.mp4";
import video3 from "../assets/video/3.mp4";
import video4 from "../assets/video/4.mp4";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import ScrollFloat from "../blocks/TextAnimations/ScrollFloat/ScrollFloat";
import CardSwap, { Card } from "../blocks/Components/CardSwap/CardSwap";


const projects = [
  {
    title: "The Magical Of Nusantara",
    desc: "The Magical Of Nusantara is an independent project from the nation's youth who dedicates a work to the Indonesia people. Tells the wonder of the archipelago especially in the land of Java.",
    tools: "After Effets, Davinci, Blender.",
    link: "https://www.youtube.com/watch?v=C5MoBOlNkiM",
    src: proj1,
    type: "AS DOP and VIDEO EDITOR",
  },
  {
    title: "Overthink Short Movie",
    desc: "Tells the story of a pair of lovers where one of them has a Trust Issue. Angel, who is always looking to find out what is really going on with Andreas lately, makes Angel feel neglected. So what is actually happening with the two of them?.",
    tools: "Premiere Pro, After Effects",
    link: "https://www.youtube.com/watch?v=3N8k2ygmxjo&t=202s",
    src: proj2,
    type: "AS DOP and VIDEO EDITOR",
  },
  {
    title: "Melangkah Short Movie",
    desc: "In a Pandemic like this, all our activities are limited. Many things are missed in vain. However, as the younger generation, we cannot just stay silent like this without doing anything. We must be tough to face a situation like this. Moving forward is the best way for us. Get out of your comfort zone, and start looking outside. Create a masterpiece and start introducing it to the world. Believe me, Indonesia is beautiful, so keep working.",
    tools: "Premiere Pro, After Effects, Blender",
    link: "https://www.youtube.com/watch?v=4AMklGJnzEk&t=18s",
    src: proj3,
    type: "AS DOP and VIDEO EDITOR",
  },
  {
    title: "Smaug Rewind'22",
    desc: "Raising the theme of breakthrough as a form of our new breakthrough, graduates of 2022 in living the future or remembering the past. Through this video, we have carved something new memory for the future.",
    tools: "Premiere Pro",
    link: "https://www.youtube.com/watch?v=0rYx0-3ewwA&t=111s",
    src: proj4,
    type: "AS DOP and VIDEO EDITOR",
  },
];

export const Portfolio = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    // Using a callback to ensure we're working with the latest state
    setExpandedIndex(prevIndex => prevIndex === index ? null : index);
  };

  return (
    <div className="text-white py-8 md:py-8 overflow-hidden" id="portfolio">
      <div className="mx-auto px-4 sm:px-8 max-w-[1400px]">
        <div className="text-6xl font-bold text-center mb-8">
          <ScrollFloat containerClassName="inline-block" textClassName="text-white text-5xl md:text-6xl cursor-target">Selected Projects</ScrollFloat> 
        </div>

        {/* Main container with relative positioning for proper stacking */}
        <div className="relative" style={{ isolation: 'isolate' }}>
          {/* CardSwap Component with Text on Left and Cards on Right - positioned behind projects */}
          <div className="w-full max-w-7xl mx-auto relative" style={{ zIndex: -1 }}>
            {/* CardSwap Section - Full Width with Box Wrapper */}
            <div className="relative w-full">
              {/* Box wrapper to prevent animation overflow - full width and transparent */}
              <div className="relative w-full h-[650px] md:h-[700px] lg:h-[800px] overflow-visible rounded-2xl p-4">
                <div className="relative w-full h-full flex flex-col md:flex-row justify-between items-center">
                
                {/* Text Section - Left Side */}
                <div className="w-full md:w-1/2 md:mb-0 flex flex-col justify-center">
                  <div className="text-left cursor-target">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wider">
                      <div className="cursor-target">MOTION</div>
                    </h2>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mb-4 tracking-wider">
                      <div className="cursor-target">GRAPHICS</div>
                    </h2>
                    <div className="w-16 h-1 bg-emerald-400 rounded-full mb-2"></div>
                    <p className="text-lg text-white/60">
                      Just look at it go!
                    </p>
                  </div>
                </div>
                
                {/* CardSwap Section - Right Side */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-35">
                  {/* Transparent container box to contain card animations */}
                  <div className="relative w-[300px] h-[600px] md:w-[350px] md:h-[600px] lg:w-[450px] lg:h-[700px] overflow-hidden" 
                    style={{ 
                      paddingTop: '50px',
                      clipPath: 'inset(0)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
                    }}>
                    {/* Inner container for CardSwap with extra height for animation */}
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      {/* Mask overlay to hide animation overflow */}
                      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
                      <CardSwap
                        width="100%"
                        height="100%"
                        cardDistance={window.innerWidth < 768 ? 100 : 70}
                        verticalDistance={window.innerWidth < 768 ? 50 : 65}
                        delay={3000}
                        pauseOnHover={false}
                        skewAmount={7}
                        // easing="cubic-bezier(0.4, 0, 0.2, 1)"
                        easing="power1.inOut"
                      >
                      <Card customClass="bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                        <div className="w-full h-full relative flex items-center justify-center cursor-target">
                          {/* Card Header */}
                          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                              <div className="w-4 h-4 rounded-full bg-gray-100"></div>
                            </div>
                            <span className="text-white text-lg font-medium">Smooth</span>
                          </div>
                          
                          <video
                            className="w-full h-full object-cover rounded-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={video1}
                            type="video/mp4"
                            preload="auto"
                            style={{ minHeight: '100%', minWidth: '100%' }}
                          ></video>
                        </div>
                      </Card>
                      
                      <Card customClass="bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                        <div className="w-full h-full relative flex items-center justify-center cursor-target">
                          {/* Card Header */}
                          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
                            <div className="flex items-center justify-center">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 6h16M4 12h16M4 18h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                              </svg>
                            </div>
                            <span className="text-white text-lg font-medium">Customizable</span>
                          </div>
                          
                          <video
                            className="w-full h-full object-cover rounded-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={video2}
                            type="video/mp4"
                            preload="auto"
                            style={{ minHeight: '100%', minWidth: '100%' }}
                          ></video>
                        </div>
                      </Card>
                      
                      <Card customClass="bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                        <div className="w-full h-full relative flex items-center justify-center cursor-target">
                          {/* Card Header */}
                          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
                            <div className="flex items-center justify-center">
                              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <span className="text-white text-lg font-medium">Reliable</span>
                          </div>
                          
                          <video
                            className="w-full h-full object-cover rounded-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={video3}
                            type="video/mp4"
                            preload="auto"
                            style={{ minHeight: '100%', minWidth: '100%' }}
                          ></video>
                        </div>
                      </Card>
                      
                      <Card customClass="bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
                        <div className="w-full h-full relative flex items-center justify-center cursor-target">
                          {/* Card Header */}
                          <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3 z-10">
                          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="3" strokeLinecap="round" transform="rotate(45 12 12)" />
</svg>

                            <span className="text-white text-lg font-medium">Engage</span>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                          <video
                            className="w-full h-full object-cover rounded-2xl"
                            autoPlay
                            muted
                            loop
                            playsInline
                            src={video4}
                            type="video/mp4"
                            preload="auto"
                            style={{ minHeight: '100%', minWidth: '100%' }}
                          ></video>
                          
    
                          </div>
                        </div>
                      </Card>
                      </CardSwap>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Projects list with higher z-index to appear above the cards */}
          <div className="space-y-6 relative -mt-30" style={{ zIndex: 10, position: 'relative' }}>
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-target relative"
              style={{ backgroundColor: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(4px)' }}
            >
              <div
                className="p-6 flex justify-between items-center cursor-pointer bg-black/20 border border-white/10 hover:bg-black/30 transition-colors duration-300"
                onClick={() => toggleExpand(index)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedIndex === index}
                onKeyDown={(e) => e.key === 'Enter' && toggleExpand(index)}
              >
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-light text-emerald-300">
                    0{index + 1}
                  </span>
                  <FiChevronDown 
                    className={`w-6 h-6 transform transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              <AnimatePresence mode="wait">
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                    animate={{ height: "auto", opacity: 1, overflow: "visible" }}
                    exit={{ height: 0, opacity: 0, overflow: "hidden" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="px-6 pb-6 bg-black/20 border border-white/10 block"
                  >
                    <motion.div 
                      className="flex flex-col md:flex-row gap-8 pt-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-white/70 mb-4">{project.desc}</p>
                        <p className="text-emerald-300 font-medium mb-2">
                          Tools: {project.tools}
                        </p>
                        <p className="text-emerald-400/60 font-medium mb-4 capitalize">
                          Job: {project.type}
                        </p>
                        <div className="flex justify-start items-center space-x-4">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-400 hover:text-blue-300 transition-colors cursor-target flex items-center gap-2"
                          >
                            <span>View Project</span> <HiOutlineExternalLink className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};