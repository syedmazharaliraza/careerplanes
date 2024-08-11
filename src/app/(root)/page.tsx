import {
  Courses,
  FeatureBanner,
  HeroSection,
  OurVision,
} from "@/components/home";
import Head from "next/head";

export default function Home() {
  return (
    <main>
      <Head>
        <title>Top Notch∆ Education & Research</title>{" "}
        <meta name="description" content="Top Notch Education & Research" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />
      <Courses />
      <OurVision />
      <FeatureBanner />
    </main>
  );
}
