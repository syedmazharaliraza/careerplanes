import {
  GraduationCapIcon,
  ChevronRightIcon,
  UsersIcon,
  BriefcaseIcon,
} from "lucide-react";

export function OurVision() {
  return (
    <section className="bg-yellow-50">
      {/* Icon Blocks */}
      <div className="container py-24 lg:py-32">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Empowering Students for Professional Success
            </h2>
            <p className="mt-3 text-muted-foreground">
              At Career Planes, we bridge the gap between campus and corporate
              life by providing comprehensive training in essential skills that
              make you stand out in the job market.
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                href="#"
              >
                Explore our courses to learn more
                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div>
          {/* End Col */}
          <div className="space-y-6 lg:space-y-10">
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full bg-primary text-primary-foreground">
                <GraduationCapIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Comprehensive Skill Development
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Our courses cover a wide range of communication and
                  interpersonal skills essential for professional success in any
                  industry.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full bg-primary text-primary-foreground">
                <UsersIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Expert-led Training
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Learn from industry professionals who bring real-world
                  experience to help you develop practical skills that employers
                  value.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
            {/* Icon Block */}
            <div className="flex">
              {/* Icon */}
              <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full bg-primary text-primary-foreground">
                <BriefcaseIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Career-Ready Preparation
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Our courses are designed to give you a competitive edge in the
                  job market, preparing you for successful transitions from
                  campus to corporate life.
                </p>
              </div>
            </div>
            {/* End Icon Block */}
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Icon Blocks */}
    </section>
  );
}
