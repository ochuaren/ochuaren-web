import { StrapiApi } from "@/infra/api/strapi";
import Link from "next/link";
import Image from "next/legacy/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import classNames from "classnames";

import type { Metadata, ResolvingMetadata } from "next";
import { Button } from "@/components/button";
import { BsPencilSquare } from "react-icons/bs";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(params.slug);
  const [board] = boards;

  return {
    title: board.name,
    openGraph: {
      title: board.name,
      images: previousImages,
    },
    twitter: {
      title: board.name,
      images: previousImages,
    },
    alternates: {
      canonical: `board/${params.slug}`
    }
  };
}

export default async function Board({ params: { slug }, searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const page = Number.parseInt((searchParams.page as string) ?? "1") ?? 1;

  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(slug);
  const [board] = boards;
  console.log('board', board);
  const { data } = await StrapiApi.Post.getPosts({
    boardSlug: slug,
    approved: board.requiredApproval,
    page,
    limit: 20,
    sort: board.sort,
  });
  const {
    data: { data: ads },
  } = await StrapiApi.Board.getAdvertisements();

  const { data: posts } = data;
  const showPrev = page > 1;
  const showNext = data.meta.pagination.pageCount > page;

  const stripHtmlTags = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <main className="bg-white min-w-full min-h-full">
      <div className="min-w-full bg-[#07a0a0] h-20 flex flex-col justify-center text-[2rem] sm:text-[2rem] pl-5 sm:pl-6 my-1">
        <span className="text-white">{board.name}</span>
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-4 mx-auto">
        {board.canPost && (
          <div className="col-span-3 flex justify-end mt-2 mb-5">
            <Button
              href={session != null ? `/board/${slug}/new` : "/api/auth/signin"}
            >
              <BsPencilSquare className="mr-2 h-5 w-5" />
              发布信息
            </Button>
          </div>
        )}
        <div className="col-span-3">
          {posts.map((post) => {
            const content = stripHtmlTags(post.content);
            return (
              <Link
                key={post.documentId}
                href={`/board/${board.slug}/${post.documentId}`}
              >
                <div className="border-2 shadow mb-5 p-5">
                  {post.featured && (
                    <div className="mb-3">
                      <span className="bg-blue-100 text-blue-800 text-lg font-medium mr-2 px-3 py-1 rounded border border-blue-400">
                        置顶
                      </span>
                    </div>
                  )}

                  <div className="flex flex-row">
                    <div
                      className={classNames(
                        "w-24 h-24 border shadow mr-3 overflow-hidden",
                        {
                          "bg-[#DDF5FF]": !post.attachments,
                        }
                      )}
                    >
                      {post.attachments && (
                        <Image
                          src={
                            post.attachments[0].url
                          }
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                          width={1}
                          height={1}
                          alt="featured image"
                        ></Image>
                      )}
                    </div>
                    <div className="p-2">
                      <h1 className="pb-5">{post.title}</h1>
                      <a href="phone://123123123" className="font-bold">
                        {post.contactPhone}
                        {!board.hideCity && (
                          <span className="font-bold pl-3">
                            {post.city}
                          </span>
                        )}
                      </a>

                      {!board.hideAddress && (
                        <div className="font-bold mt-3">
                          {post.address}
                        </div>
                      )}

                      {/* <p
                        className="mt-3"
                        dangerouslySetInnerHTML={{
                          __html: content.substring(
                            0,
                            Math.min(50, content.length)
                          ),
                        }}
                      ></p> */}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="flex justify-center col-span-3 mb-5">
            {showPrev && (
              <Link
                href={`/board/${slug}?page=${page - 1}`}
                className="px-5 border bg-[#DDF5FF]"
              >
                上一页
              </Link>
            )}
            {showNext && (
              <Link
                href={`/board/${slug}?page=${page + 1}`}
                className="px-5 border bg-[#DDF5FF]"
              >
                下一页
              </Link>
            )}
          </div>
        </div>
        <div className="mx-5">
          <div className="mb-1">
            <Image
              src={ads.notice.url}
              alt="post notice"
              width={1242}
              height={2208}
              objectFit="contain"
              style={{ height: "auto", width: "100%" }}
            />
          </div>

          <div className="mb-1">
            <Image
              src={ads.boardAd1.url}
              alt="ads purchase"
              width={750}
              height={474}
              objectFit="contain"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
          <div className="mb-1">
            <Image
              src={ads.boardAd2.url}
              alt="ads purchase"
              width={750}
              height={520}
              objectFit="contain"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
