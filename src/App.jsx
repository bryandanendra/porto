import { Footer } from "./components/Footer";
// import { Navbar } from "./components/Navbar";
import SlideNav from "./components/SlideNav";
import { About } from "./pages/About";
import { Hero } from "./pages/Hero";
import { Portfolio } from "./pages/Portfolio";
import { Stack } from "./pages/Stack";
import { TargetCursor, SplashCursor } from "./blocks/Animations";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Deteksi mobile berdasarkan user agent dan touch support
      const userAgent = navigator.userAgent.toLowerCase();
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent) || 
                            window.innerWidth <= 768 || 
                            hasTouchScreen;
      
      setIsMobile(isMobileDevice);
      
      // Tambahkan class ke body untuk mengontrol cursor-target
      if (isMobileDevice) {
        document.body.classList.remove('desktop-cursor');
        document.body.classList.add('mobile-cursor');
      } else {
        document.body.classList.remove('mobile-cursor');
        document.body.classList.add('desktop-cursor');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {isMobile ? <SplashCursor /> : <TargetCursor />}
      <SlideNav />
      <Hero/>
      <About/>
      <Portfolio/>
      <Stack/>
      <Footer/>
      <Analytics />
    </div>
  )
}