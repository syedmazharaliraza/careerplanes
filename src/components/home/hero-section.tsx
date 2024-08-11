import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="bg-yellow-400 relative">
      <div className="container pt-24 lg:pt-32 flex flex-col lg:flex-row items-center justify-center gap-10">
        <Image
          src="/assets/student-img-girl.webp"
          alt="student-img"
          width={930}
          height={1055}
          className="max-lg:hidden w-full md:w-[400px] object-cover"
        />
        <div className="md:mb-14">
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              From Campus to Corporate Success
            </h1>
          </div>
          {/* End Title */}
          <div className="mt-8 max-w-3xl text-center mx-auto">
            <p className="text-xl text-gray-600">
              Career Planes offers comprehensive training to refine your
              communication and interpersonal skills, ensuring you stand out in
              the competitive job market.
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-10 gap-3 flex justify-center">
            <Button size={"lg"}>Get started</Button>
            <Button size={"lg"} variant={"outline"}>
              Learn more
            </Button>
          </div>
          {/* End Buttons */}
        </div>
        <Image
          src="/assets/student-img.webp"
          alt="student-img"
          width={930}
          height={1055}
          className="w-[350px] h-full lg:w-[400px] object-cover"
        />
        <div className="absolute -rotate-6 top-8 lg:top-14 right-4 lg:right-10 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-2">
          <span className="text-2xl font-extrabold text-">10+ 📈</span>
          <span className="text-xs text-gray-700 flex items-center font-bold">
            Paid Courses
            <br />
            Listed Online
          </span>
        </div>
      </div>
    </div>
  );
}
