import PasswordGate from "@/components/PasswordGate";
import Header from "@/components/testing/Header";
import Footer from "@/components/testing/Footer";
import Leadership from "@/components/testing/company/Leadership";
import WeAreEleven from "@/components/testing/company/WeAreEleven";
import OurStory from "@/components/testing/company/OurStory";

export default function CompanyPage() {
  return (
    <PasswordGate>
      <div className="bg-white text-neutral-900">
        <Header variant="dark" />
        <Leadership />
        <WeAreEleven />
        <OurStory />
        <Footer />
      </div>
    </PasswordGate>
  );
}
