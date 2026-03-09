import { StrapiApi } from "@/infra/api/strapi";
import { IMedia } from "@/infra/api/strapi/models/listing";
import Image from "next/image";
import { IListing } from "../infra/api/strapi/models/listing";
import Link from "next/link";
import { AboutUs } from "@/components/about-us";
import { Footer } from "@/components/footer";
import { IPost } from "@/infra/api/strapi/models/post";
import Markdown from "react-markdown";
import { useState } from "react";
import { TabBar } from "@/components/tabbar";
import { Posts } from "@/components/posts";

export const metadata = {
  title: "OC华人生活圈-专属Orange County本地华人的生活圈",
};

const Listings = ({ listings }: { listings: IListing[] }) => {
  return (
    <div className="mx-auto relative">
      <div className="bg-[#DDF5FF]">
        <div className="w-full flex flex-col sm:justify-evenly">
          <div className="grid grid-cols-3">
            {listings.map((listing) => {
              return (
                <Link key={listing.id} href={`/board/${listing.slug}`}>
                  <div className="h-[35px] sm:h-[64px] md:h-[80px] border border-[#e46e28] bg-[#fe7f22] flex justify-center items-center text-white py-[0.3rem] text-[14px] sm:text-md xl:text-2xl">
                    {listing.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Home({
  params: { page },
}: {
  params: { page: string };
}) {
  const {
    data: { data: homePage },
  } = await StrapiApi.Home.getPageData();
  // const {
  //   data: { data: articles },
  // } = await StrapiApi.Post.getPosts({
  //   boardSlug: "news",
  //   limit: 22,
  //   sort: {
  //     refreshedAt: "desc",
  //   },
  // });
  // const {
  //   data: { data: sports },
  // } = await StrapiApi.Post.getPosts({
  //   boardSlug: "di-fang-tui-jian",
  //   limit: 10,
  // });
  // const {
  //   data: { data: activiies },
  // } = await StrapiApi.Post.getPosts({
  //   boardSlug: "activities",
  //   limit: 22,
  //   sort: {
  //     refreshedAt: "desc",
  //   },
  // });
  const heroes = homePage.heroes;
  const listings = homePage.listings;
  const productsHeading = homePage.productsHeading;
  const products = homePage.products;
  // Preload posts for all products at build time so the static export contains them.
  const allPosts: Record<string, IPost[]> = {};
  for (const p of products) {
    try {
      const {
        data: { data: postsData },
      } = await StrapiApi.Post.getPosts({
        boardSlug: p.slug,
        limit: 17,
        sort: p.sort,
      });
      allPosts[p.slug] = postsData || [];
    } catch (e) {
      allPosts[p.slug] = [];
      console.error(e);
    }
  }
  const gallery = homePage.gallery;
  const galleryHeading = homePage.galleryHeading;
  const gallery2 = homePage.gallery2;
  const gallery2Heading = homePage.gallery2Heading;
  const bottomPhoto = homePage.bottomPhoto;
  const contactPhoto = homePage.contactPhoto;

  // const banner2 = homePage.attributes.banner2.data?.attributes;
  // const { a, b, c, d } = homePage.attributes;
  // const gallery1 = [a, b, c, d];
  // const gallery = homePage.attributes.gallery.data;
  // const gallery2 = homePage.attributes.gallery2.data;
  // const gallery3 = homePage.attributes.gallery3.data;
  // const { data: listings } = homePage.attributes.listings;
  // const listingBgImage = homePage.attributes.listingBgImage.data?.attributes;
  // const categoryImage = homePage.attributes.categoryImage.data?.attributes;
  // const aboutUs = homePage.attributes.aboutUs.data?.attributes;
  // const qrCode = homePage.attributes.qrcode;

  return (
    <>
      <div className="mx-auto rounded-lg min-w-full relative">
        <Image
          src={heroes[0].url}
          alt={heroes[0].alternativeText}
          // fill={true}
          width={heroes[0].width}
          height={heroes[0].height}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          priority={true}
          loading="eager"
        />
      </div>

      <Listings listings={listings}></Listings>
      <TabBar
        productsHeading={productsHeading}
        products={products}
        allPosts={allPosts}
      />

      <div className="my-5">
        <Markdown className="flex flex-col items-center mb-5">
          {galleryHeading}
        </Markdown>
        <div
          id="gallery1"
          className="mx-auto grid grid-cols-2 lg:grid-cols-3 items-stretch gap-2 my-2"
        >
          {gallery.map((g) => (
            <div key={g.id ?? ""} className="w-full  rounded-lg relative">
              {g && (
                <Link href={g.caption ?? ""} target="_blank">
                  <Image
                    src={g.url}
                    alt={g.alternativeText}
                    width={g.width}
                    height={g.height}
                  />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <Markdown className="flex flex-col items-center mb-5">
          {gallery2Heading}
        </Markdown>
        <div className="mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-center rounded-lg">
          {gallery2?.map((g) => (
            <div
              key={g.id ?? ""}
              className="bg-slate-500 aspect-square	rounded-lg relative"
            >
              {g && (
                <Link href={g.caption ?? ""}>
                  <Image src={g.url} alt={g.alternativeText} fill={true} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        {bottomPhoto && (
          <Image
            src={bottomPhoto.url}
            alt={bottomPhoto.alternativeText}
            className="w-full h-auto"
            width={0}
            height={0}
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>

      <div>
        {contactPhoto && (
          <Image
            src={contactPhoto.url}
            alt={contactPhoto.alternativeText}
            className="w-full h-auto"
            width={0}
            height={0}
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>

      {/* <div className="mx-auto rounded-lg mt-2 mb-1 min-w-full h-[96px] bg-slate-500 p-12 relative">
        {banner2 && (
          <Link href={banner2.caption ?? ""}>
            <Image
              src={banner2.url}
              alt={banner2.alternativeText}
              fill={true}
              objectFit="cover"
              objectPosition="center"
            />
          </Link>
        )}
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-5">
        {/* <div className="rounded-lg bg-[#DDF5FF] h-full">
          <div className="min-w-full bg-[rgb(165,223,248)] p-1 text-center">
            OC地区/新闻资讯
          </div>
          {<Posts posts={articles}></Posts>}
        </div> */}

        {/* <div className="grid grid-cols-4 h-full gap-2"> */}
        {/* <div className="min-w-full  rounded-lg bg-[#DDF5FF] h-full">
            <div className="min-w-full bg-[rgb(165,223,248)] p-1 text-center">
              橙县/宝藏新店
            </div>
            {<Posts posts={deals}></Posts>}
          </div>
          <div className="min-w-full bg-[#DDF5FF] rounded-lg h-full">
            <div className=" bg-[rgb(165,223,248)] p-1 text-center">
              橙县/地方推荐
            </div>
            {<Posts posts={sports}></Posts>}
          </div> */}
        {/* {listings.slice(6).map((x) => (
            <Link key={x.id} href={x.attributes.link ?? ""}>
              <div className="h-10 rounded bg-[#66A5FE] flex justify-center items-center text-white py-[0.3rem] text-[14px] sm:text-sm xl:text-xl">
                {x.attributes.name}
              </div>
            </Link>
          ))} */}
        {/* </div> */}
      </div>

      {/* <div
        id="gallery"
        className="mx-auto grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 text-center rounded-lg"
      >
        {gallery.map((g) => (
          <div
            key={g.id ?? ""}
            className="min-w-full bg-slate-500 rounded-lg p-14 relative"
          >
            {g && (
              <Link href={g.attributes.caption ?? ""} target="_blank">
                <Image
                  src={g.attributes.url}
                  alt={g.attributes.alternativeText}
                  fill={true}
                />
              </Link>
            )}
          </div>
        ))}
      </div> */}

      {/* <div className="mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-center rounded-lg">
        {gallery3?.map((g) => (
          <div
            key={g.id ?? ""}
            className="min-w-full bg-slate-500 rounded-lg p-16 relative"
          >
            {g && (
              <Link href={g.attributes.caption ?? ""} target="_blank">
                <Image
                  src={g.attributes.url}
                  alt={g.attributes.alternativeText}
                  fill={true}
                />
              </Link>
            )}
          </div>
        ))}
      </div> */}
      {/* <AboutUs aboutUs={aboutUs}></AboutUs> */}
      {/* <Footer qrcode={qrCode.data} /> */}
    </>
  );
}
