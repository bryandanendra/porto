import React from "react";
import Masonry from "../blocks/Components/Masonry/Masonry";
import SpotlightCard from "../blocks/Components/SpotlightCard/SpotlightCard";
import ScrollFloat from "../blocks/TextAnimations/ScrollFloat/ScrollFloat";

// Import gambar lokal
import photo1 from "../assets/images/1.jpg";
import photo2 from "../assets/images/2.jpg";
import photo3 from "../assets/images/3.jpg";
import photo4 from "../assets/images/4.jpg";
import photo5 from "../assets/images/5.jpg";
import photo6 from "../assets/images/6.jpg";
import photo7 from "../assets/images/7.jpg";
import photo8 from "../assets/images/8.jpg";
import photo9 from "../assets/images/9.jpg";
import photo10 from "../assets/images/10.jpg";
import photo11 from "../assets/images/11.jpg";
import photo12 from "../assets/images/12.jpg";

export const About = () => {
  // Data gambar untuk Masonry
  const masonryData = [
    {
      id: 1,
      height: 400,
      image: photo1, // Video editing
    },
    {
      id: 2,
      height: 300,
      image: photo2, // Filmmaking
    },
    {
      id: 3,
      height: 500,
      image: photo3, // Camera footage
    },
    {
      id: 4,
      height: 350,
      image: photo4, // Video editing setup
    },
    {
      id: 5,
      height: 400,
      image: photo5, // Production
    },
    {
      id: 6,
      height: 450,
      image: photo6, // Studio equipment
    },
    {
      id: 7,
      height: 380,
      image: photo7, // Video editing interface
    },
    {
      id: 8,
      height: 420,
      image: photo8, // Motion graphics
    },
    {
      id: 9,
      height: 420,
      image: photo9, // Motion graphics
    },
    {
      id: 10,
      height: 420,
      image: photo10, // Motion graphics
    },
    {
      id: 11,
      height: 420,
      image: photo11, // Motion graphics
    },
    {
      id: 12,
      height: 420,
      image: photo12, // Motion graphics
    }
  ];

  return (
    <section id="about" className="py-8 px-4 sm:px-8 max-w-[1400px] mx-auto overflow-hidden">
      <div className="text-center mb-8 sm:mb-12">
        <div className="text-5xl md:text-6xl text-white font-bold mb-6">
          <ScrollFloat containerClassName="inline-block" textClassName="text-white text-9xl md:text-7xl">About Me</ScrollFloat>
        </div>
      </div>
      
      <div className="h-[1250px] md:h-[850px] lg:h-[700px] xl:h-[600px] mb-8 sm:mb-16"> {/* Tinggi responsif berdasarkan ukuran layar */}
        <Masonry data={masonryData} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white mb-16 max-w-4xl mx-auto justify-items-center">
        <SpotlightCard spotlightColor="rgba(52, 211, 153, 0.3)" className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4 text-emerald-400">Experiences</h3>
          <p className="text-white/70 mb-6">
            With 2+ years in the game, I've mastered everything from viral social content 
            to commercial bangers. My superpower? Next-level color grading & sick VFX.
          </p>
          <a 
            href="#contact" 
            className="inline-block px-5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-full border border-emerald-500/40 transition-colors duration-300"
          >
            Contact Me
          </a>
        </SpotlightCard>
        
        <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.3)" className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">Creativity</h3>
          <p className="text-white/70 mb-6">
            I blend creativity with technical skills to craft stunning visuals and tell 
            captivating stories through video. Every project is a chance to experiment 
            with fresh techniques and innovative styles.
          </p>
          <a 
            href="#contact" 
            className="inline-block px-5 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-full border border-purple-500/40 transition-colors duration-300"
          >
            Contact Me
          </a>
        </SpotlightCard>
        
      </div>
    </section>
  );
};
