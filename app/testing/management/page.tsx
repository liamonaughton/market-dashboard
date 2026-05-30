import PasswordGate from "@/components/PasswordGate";
import Header from "@/components/testing/Header";
import Footer from "@/components/testing/Footer";
import ManagementHero from "@/components/testing/management/Hero";
import WhyChoose from "@/components/testing/management/WhyChoose";
import ContactForm from "@/components/testing/management/ContactForm";

export default function ManagementPage() {
  return (
    <PasswordGate>
      <div className="bg-white text-neutral-900">
        <Header />
        <ManagementHero />
        <WhyChoose />
        <ContactForm />
        <Footer />
      </div>
    </PasswordGate>
  );
}
