import { Footer } from "./components/Footer";
// import { Navbar } from "./components/Navbar";
import SlideNav from "./components/SlideNav";
import { TargetCursor, GradualBlur } from "./blocks/Animations";
import { Analytics } from "@vercel/analytics/react";
import { lazy, Suspense, useState, useEffect } from "react";

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
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    // Hanya tampilkan custom cursor pada device non-touch dan layar besar
    const checkCursorVisibility = () => {
      // (pointer: fine) mendeteksi mouse/trackpad akurat
      // dan lebar layar > 768px (tablet/desktop)
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth > 768;

      setShowCustomCursor(hasFinePointer && isLargeScreen);
    };

    checkCursorVisibility();
    window.addEventListener('resize', checkCursorVisibility);

    return () => window.removeEventListener('resize', checkCursorVisibility);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {showCustomCursor && <TargetCursor />}

      {/* Gradual Blur - Bottom only (optimized for performance) */}
      <GradualBlur
        target="page"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={5}
        curve="bezier"
        zIndex={9999}
        opacity={0.85}
      />

      <SlideNav />
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Portfolio />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Stack />
      </Suspense>
      <Footer />
      <Analytics />
    </div>
  )
}