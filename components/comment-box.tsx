"use client";

import { StrapiApi } from "@/infra/api/strapi";
import { IPost } from "@/infra/api/strapi/models/post";
import { useState } from "react";
import { BsEmojiNeutral } from "react-icons/bs";
import classNames from "classnames";

interface Props {
  post: IPost;
  canReply: boolean;
  isLoggedIn: boolean;
}
export const CommentBox = ({ post, canReply, isLoggedIn }: Props) => {
  const [comment, setComment] = useState("");
  const handlePost = async () => {
    if (!isLoggedIn) {
      window.location.href = "/api/auth/signin";
      return;
    }
    await StrapiApi.Post.addComment({
      post: post.id,
      content: comment,
    });
    window.location.reload();
  };
  return (
    <div>
      {canReply && (
        <div className="comments mt-10">
          <div>
            <div className="p-2 bold border w-20 my-5 font-roboto font-light bg-sky-100 text-center">
              <span>写评论</span>
            </div>
            <div>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                className="w-full border shadow-sm p-2 h-10 resize-none"
                placeholder="写下你想评论的话语"
              />
            </div>
            <div className="flex justify-end mt-3">
              <button
                className="bg-[#190D87] text-white rounded-md px-4 py-2"
                onClick={handlePost}
              >
                发布
              </button>
            </div>
          </div>
          <div>
            <div className="p-2 bold border w-24 mt-5 font-roboto font-light bg-sky-100 text-center">
              <span>评论内容</span>
            </div>
            {post.attributes.comments.data.map((comment) => (
              <div className="flex flex-row mb-5 py-5" key={comment.id}>
                <div className="w-12 h-12 border shadow flex justify-center items-center">
                  <BsEmojiNeutral size="36px" color="000000" />
                </div>
                <div className="p-2">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: comment.attributes.content,
                    }}
                  ></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
