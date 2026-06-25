import LoadingScreen from "../../components/shared/LoadingScreen";
import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import WhyLove from "../../components/home/WhyLove";
import HowItWorks from "../../components/home/HowItWorks";
import ExamPrepar from "../../components/home/ExamPrepar";
import FAQ from "../../components/home/FAQ";
import CTA from "../../components/home/CTA";
import Contact from "../../components/home/Contact";
import Footer from "../../components/home/Footer";

function Home() {
  return (
    <div className="relative min-h-screen bg-white w-full overflow-hidden">
      <LoadingScreen />
      
      {/* Landing page header */}
      <Navbar />

      {/* Hero section */}
      <main className="w-full">
        <Hero />
        <HowItWorks />
        <WhyLove />
        <ExamPrepar />
        <CTA />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
