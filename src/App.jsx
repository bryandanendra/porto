import { Footer } from "./components/Footer";
// import { Navbar } from "./components/Navbar";
import SlideNav from "./components/SlideNav";
import { TargetCursor, SplashCursor } from "./blocks/Animations";
import { Analytics } from "@vercel/analytics/react";
import { useState, useEffect, lazy, Suspense } from "react";

// Lazy load komponen besar
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const Hero = lazy(() => import("./pages/Hero").then(module => ({ default: module.Hero })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(module => ({ default: module.Portfolio })));
const Stack = lazy(() => import("./pages/Stack").then(module => ({ default: module.Stack })));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400"></div>
  </div>
);

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
      <Suspense fallback={<LoadingSpinner />}>
        <Hero/>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <About/>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Portfolio/>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Stack/>
      </Suspense>
      <Footer/>
      <Analytics />
    </div>
  )
}