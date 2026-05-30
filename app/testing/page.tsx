import PasswordGate from "@/components/PasswordGate";
import Header from "@/components/testing/Header";
import Hero from "@/components/testing/Hero";
import ElevatedExperiences from "@/components/testing/ElevatedExperiences";
import Fleet from "@/components/testing/Fleet";
import Process from "@/components/testing/Process";
import Destinations from "@/components/testing/Destinations";
import Footer from "@/components/testing/Footer";

export default function TestingPage() {
  return (
    <PasswordGate>
      <div className="bg-black text-white">
        <Header />
        <Hero />
        <ElevatedExperiences />
        <Fleet />
        <Process />
        <Destinations />
        <Footer />
      </div>
    </PasswordGate>
  );
}
