import {
  Courses,
  FeatureBanner,
  HeroSection,
  OurVision,
} from "@/components/home";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Notch∆ Education & Research",
  description: "Top Notch Education & Research",
};

export default async function Home() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main>
      <HeroSection />
      {/* <Courses /> */}
      <FeatureBanner />
      <OurVision />
    </main>
  );
}
