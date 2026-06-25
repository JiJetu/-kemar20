import LoadingScreen from "../../components/shared/LoadingScreen";
import Navbar from "../../components/home/Navbar";
import Hero from "../../components/home/Hero";
import WhyLove from "../../components/home/WhyLove";
import HowItWorks from "../../components/home/HowItWorks";

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
      </main>
    </div>
  );
}

export default Home;
