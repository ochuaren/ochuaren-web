'use client';

import { StrapiApi } from "@/infra/api/strapi";
import { IPost } from "@/infra/api/strapi/models/post";
import { useEffect, useState } from "react";
import { Posts } from "./posts";
import classNames from "classnames";
import { IListing } from "@/infra/api/strapi/models/listing";


export const TabBar = ({productsHeading, products}: { productsHeading: string, products: IListing[]}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [posts, setPosts] = useState<IPost[]>([]);
  console.log(posts);
  useEffect(() => {
    StrapiApi.Post.getPosts({ boardSlug: products[selectedIndex].slug, limit: 15 }).then(x => x.data).then(x => {
      setPosts(x.data);
    });
  }, [selectedIndex]);
    return <div>
        <div className="text-center mt-20 mb-10 font-bold text-3xl uppercase text-[#666666]">
          {productsHeading}
        </div>
        <div className="flex justify-center">
          {
            products.map((p, index) => {
              return <>
                <div className={classNames("border mx-5 px-5 md:px-20 rounded-full py-4 bg-[#07a0a0] text-white text-xl md:text-2xl tracking-[0.5rem] md:tracking-[1rem]", {
                  "bg-[#177777]": index == selectedIndex
                })} onClick={() => {
                  setSelectedIndex(index);
                }}>{p.name}</div>
              </>;
            })
          }
        </div>
        <div className="h-full border bg-[#f3f3f300] my-2"><Posts posts={posts}></Posts></div>
      </div>
}