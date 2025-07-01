"use client";
import { IMedia } from "@/infra/api/strapi/models/listing";
import { Carousel } from "flowbite-react";
import Image from "next/image";

interface Props {
  photos: IMedia[];
}

export const Gallery = ({ photos }: Props) => {
  return (
    <div className="h-96 bg-black">
      <Carousel>
        {photos?.map((photo) => (
          <Image
            src={photo.url}
            key={photo.id}
            style={{
              width: "auto",
              height: "100%",
            }}
            width={photo.width}
            height={photo.height}
            alt="upload image"
          ></Image>
        ))}
      </Carousel>
    </div>
  );
};
