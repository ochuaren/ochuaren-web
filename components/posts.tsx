import { IPost } from "@/infra/api/strapi/models/post";
import dayjs from "dayjs";
import Link from "next/link";

export const Posts = ({ posts }: { posts: IPost[] }) => {
  return (
    <ul className="list-disc marker:text-[#07a0a0] marker:text-3xl ms-10">
      {posts.map((post) => (
        <li className="relative" key={post.id}>
          <div className="w-full text-md">
            <Link
              href={`/board/${post.board.slug}/post/${post.documentId}`}
              className="text-[#282727] no-underline"
              target="_blank"
            >
              <div className="flex justify-between mr-5">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {post.title}
                </div>
                <div className="ml-8 text-[#c1bebe] min-w-[45px]">
                  {dayjs(post.refreshedAt).format("MM-DD")}
                </div>
              </div>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
