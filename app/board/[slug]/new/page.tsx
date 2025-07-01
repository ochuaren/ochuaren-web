import { StrapiApi } from "@/infra/api/strapi";
import { SubmitHandler } from "react-hook-form";
import { PostInputs, PostForm } from "@/components/post-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

export default async function Board({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const {
    data: { data: boards },
  } = await StrapiApi.Board.getBoard(slug);
  const board = boards[0];
  const session = await getServerSession<{}, Session>(authOptions);
  if (session?.user.id === undefined) {
    return null;
  }
  const { data } = await StrapiApi.Auth.getUser(session?.user.id ?? "");

  return (
    <main className="bg-white min-w-full min-h-full pb-12">
      <div className="min-w-full bg-[#190D87] h-36 flex flex-col justify-center text-[3rem] pl-5 sm:pl-36 my-1">
        <span className="text-white">{board?.attributes?.name}</span>
      </div>
      <div className="container mx-auto">
        <div className="text-center text-[1.5rem] mt-3">信息发布页</div>
        {!data.blocked ? (
          <PostForm userId={session?.user.id} board={board} />
        ) : (
          <h1>此账号已被封禁！</h1>
        )}
      </div>
    </main>
  );
}
