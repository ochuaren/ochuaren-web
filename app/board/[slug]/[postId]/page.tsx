import { CommentBox } from "@/components/comment-box";
import { Gallery } from "@/components/gallery";
import { StrapiApi } from "@/infra/api/strapi";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { strapiConfig } from "@/config/strapi";
import dayjs from "dayjs";
import Link from "next/link";

import type { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: { postId: number; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const {
    data: { data: post },
  } = await StrapiApi.Post.getPostById(params.postId);

  return {
    title: post.title,
    openGraph: {
      title: post.title,
      images: previousImages,
    },
    twitter: {
      title: post.title,
    },
    alternates: {
      canonical: `/board/${params.slug}/${params.postId}`
    }
  };
}

export default async function Post({ params: { postId, slug } }: Props) {
  const session = await getServerSession(authOptions);
  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(slug);
  const board = boards[0];
  const {
    data: { data: post },
  } = await StrapiApi.Post.getPostById(postId);

  const content = post.content.replaceAll(
    /\/uploads\//g,
    strapiConfig.apiUrl + "/uploads/"
  );
  const postDate = dayjs(post.refreshedAt);

  const renderAttribute = ({
    name,
    value,
    renderValue,
  }: {
    name: string;
    value: string | React.ReactElement | number | undefined;
    renderValue?: string | React.ReactElement | number;
  }) => {
    return (
      value && (
        <div className="flex items-center border-b border-r">
          <div className="p-2 w-32 max-w-full py-3 text-base border-l border-r">
            {name}
          </div>
          <div className="pl-5 text-base font-semibold">
            {renderValue || value}
          </div>
        </div>
      )
    );
  };

  return (
    <main className="bg-white min-w-full min-h-full">
      <div className="min-w-full bg-[#07a0a0] h-20 flex flex-col justify-center text-[2rem] sm:text-[2rem] pl-5 sm:pl-6 my-1">
        <span className="text-white">
          {!board.disallowGoBack ? (
            <Link href={`/board/${board.slug}`}>
              {board.name}
            </Link>
          ) : (
            board.name
          )}
        </span>
      </div>

      <div className="container mx-auto my-5 px-5">
        <h1 className="py-5">{post.title}</h1>
        {!board.hideDate && (
          <span className="text-[#9c9c9c]">
            发布日期：{postDate.format("YYYY-MM-DD")}
          </span>
        )}

        {!board.hidePostMeta && (
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-screen-lg py-10">
            <div className="md:mr-10 pb-5 md:pb-0 border-t">
              {!board.hidePricing &&
                renderAttribute({ name: "价格", value: post.price })}
              {!board.hideAddress &&
                renderAttribute({
                  name: "地址",
                  value: post.address,
                  renderValue: (
                    <a
                      href={`http://maps.google.com/?q=${post.address}`}
                    >
                      {post.address}
                    </a>
                  ),
                })}
              {!board.hideCity &&
                renderAttribute({ name: "城市", value: post.city })}
              {!board.hideCategory &&
                renderAttribute({
                  name: "分类",
                  value: post.category,
                })}
              {!board.hidePhone &&
                renderAttribute({
                  name: "联系电话",
                  value: post.contactPhone,
                  renderValue: (
                    <a href={`tel:${post.contactPhone}`}>
                      {post.contactPhone}
                    </a>
                  ),
                })}
              {!board.hideEmail &&
                renderAttribute({
                  name: "联系Email",
                  value: post.contactEmail,
                  renderValue: (
                    <a href={`mailto:${post.contactEmail}}`}>
                      {post.contactEmail}
                    </a>
                  ),
                })}
              {!board.hideWechat &&
                renderAttribute({
                  name: "微信",
                  value: post.wechat,
                })}
              {!board.hideWebsiteUrl &&
                renderAttribute({
                  name: "网址",
                  value: post.websiteUrl,
                })}
            </div>
            {post.attachments && (
              <div>
                <Gallery photos={post.attachments} />
              </div>
            )}
          </div>
        )}
        {/* <div className="p-2 bold border w-24 my-5 font-roboto font-light bg-sky-100 text-center">
          <span>帖子内容</span>
        </div> */}
        <p dangerouslySetInnerHTML={{ __html: content }}></p>
        <CommentBox
          post={post}
          canReply={board.canReply}
          isLoggedIn={session != null}
        ></CommentBox>
        {!board.hideDisclaimer && (
          <div className="border p-3 mt-12 rounded bg-[#fffaf0] text-[#bebdbd] text-xs">
            免责声明：本站内容由互联网用户自发贡献，平台只负责展示，请自辨真伪，本站不承担相关法律责任。如有涉及侵犯版权，请联系我们提供书面反馈，我们核实后会立即删除。
          </div>
        )}
      </div>
    </main>
  );
}
