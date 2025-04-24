import { Footer } from "./components/Footer";
// import { Navbar } from "./components/Navbar";
import SlideNav from "./components/SlideNav";
import { About } from "./pages/About";
import { Hero } from "./pages/Hero";
import { Portfolio } from "./pages/Portfolio";
import { Stack } from "./pages/Stack";
import { SplashCursor } from "./blocks/Animations";

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <SplashCursor />
      <SlideNav />
      <Hero/>
      <About/>
      <Portfolio/>
      <Stack/>
      <Footer/>
    </div>
  )
}