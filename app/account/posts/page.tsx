import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PostsContainer } from "@/components/posts-container";
import { StrapiApi } from "@/infra/api/strapi";
import { Pagination } from "flowbite-react";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";

export default async function Profile() {
  const session = await getServerSession<{}, Session>(authOptions);
  if (session?.user.id === undefined) {
    return null;
  }
  const { data } = await StrapiApi.Auth.getUser(session?.user.id ?? "");
  return (
    <div>
      <span className=" w-full text-black text-[1.25rem] rounded-md">
        我的帖子
      </span>
      <hr />
      {!data.blocked ? (
        <PostsContainer userId={session?.user.id}></PostsContainer>
      ) : (
        <h1>此账号已被封禁！</h1>
      )}
    </div>
  );
}
