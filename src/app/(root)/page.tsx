import {
  Courses,
  FeatureBanner,
  HeroSection,
  OurVision,
} from "@/components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Notch∆ Education & Research",
  description: "Top Notch Education & Research",
};

export default async function Home() {
  return (
    <main>
      <HeroSection />
      {/* <Courses /> */}
      <FeatureBanner />
      <OurVision />
    </main>
  );
}
