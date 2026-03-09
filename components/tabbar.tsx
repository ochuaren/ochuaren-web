"use client";

import { IPost } from "@/infra/api/strapi/models/post";
import { useState } from "react";
import { Posts } from "./posts";
import classNames from "classnames";
import { IListing } from "@/infra/api/strapi/models/listing";

export const TabBar = ({
  productsHeading,
  products,
  allPosts,
}: {
  productsHeading: string;
  products: IListing[];
  allPosts: Record<string, IPost[]>;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentSlug = products[selectedIndex]?.slug;
  const posts: IPost[] = (currentSlug && allPosts?.[currentSlug]) || [];

  return (
    <div>
      <div className="text-center mt-16 mb-10 font-bold text-2xl uppercase text-[#666666]">
        {productsHeading}
      </div>
      <div className="flex justify-center">
        {products.map((p, index) => {
          return (
            <div
              key={p.id ?? p.slug}
              className={classNames(
                "border mx-4 px-6 md:px-10 rounded-full py-2 bg-[#07a0a0] text-white text-md md:text-2xl tracking-[0.25rem] md:tracking-[0.5rem]",
                {
                  "bg-[#177777]": index == selectedIndex,
                },
              )}
              onClick={() => {
                setSelectedIndex(index);
              }}
            >
              {p.name}
            </div>
          );
        })}
      </div>
      <div className="h-full border bg-[#f3f3f300] my-6">
        <Posts posts={posts}></Posts>
      </div>
    </div>
  );
};
