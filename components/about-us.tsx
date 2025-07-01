import { strapiConfig } from "@/config/strapi";
import { IMedia } from "@/infra/api/strapi/models/listing";
import Image from "next/image";

export const AboutUs = ({ aboutUs }: { aboutUs: IMedia["attributes"] }) => {
  return (
    <div className="container mx-auto rounded-lg mt-2 min-w-full bg-slate-500 relative">
      {aboutUs && (
        <Image
          src={aboutUs.url}
          alt={aboutUs.alternativeText}
          width={aboutUs.width}
          height={aboutUs.height}
        />
      )}
    </div>
  );
};
