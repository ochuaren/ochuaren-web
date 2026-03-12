import { StrapiApi } from "@/infra/api/strapi";
import Link from "next/link";
import Image from "next/legacy/image";
import classNames from "classnames";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string; pageNumber?: number };
};

export async function generateStaticParams() {
  return StrapiApi.Board.getBoards().then((res) => {
    const boards = res.data.data;
    return boards.map((board) => ({
      slug: board.slug,
      pageNumber: "1",
    }));
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(params.slug);
  const [board] = boards;

  return {
    title: board.name,
    icons: [
      {
        rel: "apple-touch-icon",
        url: board.icon.formats.thumbnail.url,
        sizes: "192x192",
      },
    ],
    openGraph: {
      title: board.name,
      images: previousImages,
    },
    twitter: {
      title: board.name,
      images: previousImages,
    },
    alternates: {
      canonical: `board/${params.slug}`,
    },
  };
}

export default async function Board({
  params: { slug, pageNumber: page = 1 },
}: Props) {
  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(slug);
  const [board] = boards;
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
        <div className="col-span-3">
          {posts.map((post) => {
            const content = stripHtmlTags(post.content);
            return (
              <Link
                key={post.documentId}
                href={`/board/${board.slug}/post/${post.documentId}`}
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
                        },
                      )}
                    >
                      {post.attachments && (
                        <Image
                          src={post.attachments[0].url}
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
                          <span className="font-bold pl-3">{post.city}</span>
                        )}
                      </a>

                      {!board.hideAddress && (
                        <div className="font-bold mt-3">{post.address}</div>
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
                href={`/board/${slug}/{page - 1}`}
                className="px-5 border bg-[#DDF5FF]"
              >
                上一页
              </Link>
            )}
            {showNext && (
              <Link
                href={`/board/${slug}/page=${page + 1}`}
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
              src={ads.boardAd1[0].url}
              alt="ads purchase"
              width={750}
              height={474}
              objectFit="contain"
              style={{ height: "auto", width: "100%" }}
            />
          </div>
          <div className="mb-1">
            <Image
              src={ads.boardAd2[0].url}
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
