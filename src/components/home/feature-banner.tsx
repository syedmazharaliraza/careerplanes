import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export const FeatureBanner = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 lg:items-center">
        <div className="flex gap-4 flex-col flex-1">
          <div>
            <Badge>New ✨</Badge>
          </div>
          <div className="flex gap-6 flex-col">
            <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:leading-[110%] lg:max-w-xl font-regular text-left">
              Investing in soft skills
              <br /> is essential
            </h2>
            <p className="text-lg max-w-xl lg:max-w-md leading-relaxed text-muted-foreground text-left">
              In today’s aggressive and ambitious world, where time means money,
              soft skills provide the edge that cuts through competition. They
              enhance the employability of candidates and provide them with
              tools to convert their potential into results.
            </p>
          </div>
        </div>
        <div className="bg-muted w-full aspect-video h-full flex-1">
          <Image
            src="/assets/banner-img.jpg"
            alt="softskills"
            height="667"
            width="667"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  </div>
);
