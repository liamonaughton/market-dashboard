import { notFound } from "next/navigation";
import PasswordGate from "@/components/PasswordGate";
import Header from "@/components/testing/Header";
import Footer from "@/components/testing/Footer";
import AircraftHero from "@/components/testing/aircraft/Hero";
import AircraftTabs from "@/components/testing/aircraft/Tabs";
import { AIRCRAFT, getAircraftBySlug } from "@/components/testing/aircraft/data";

export function generateStaticParams() {
  return AIRCRAFT.map((a) => ({ slug: a.slug }));
}

export default function AircraftDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const aircraft = getAircraftBySlug(params.slug);
  if (!aircraft) notFound();

  return (
    <PasswordGate>
      <div className="bg-white text-neutral-900">
        <Header />
        <AircraftHero aircraft={aircraft} />
        <AircraftTabs aircraft={aircraft} />
        <Footer />
      </div>
    </PasswordGate>
  );
}
