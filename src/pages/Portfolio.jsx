import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import proj1 from "../assets/images/tmo-nusantara-tn.jpg";
import proj2 from "../assets/images/overthink-tn.jpg";
import proj3 from "../assets/images/melangkah-tn.jpg";
import proj4 from "../assets/images/smaug-rewind-tn.jpg";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";
import ScrollFloat from "../blocks/TextAnimations/ScrollFloat/ScrollFloat";


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
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="text-white py-8 md:py-8" id="portfolio">
      <div className="container mx-auto px-4">
        <div className="text-6xl font-bold text-center mb-16">
          <ScrollFloat containerClassName="inline-block" textClassName="text-white text-5xl md:text-6xl">Selected Projects</ScrollFloat> 
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div
                className="p-6 flex justify-between items-center cursor-pointer bg-black/20 border border-white/10"
                onClick={() => toggleExpand(index)}
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
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6  bg-black/20 border border-white/10"
                  >
                    <div className="flex flex-col md:flex-row gap-8">
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
                            className="text-emerald-400 hover:text-blue-300 transition-colors"
                          >
                            <HiOutlineExternalLink />
                          </a>
                          <a
                            href={project.git}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            <FaGithub />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
