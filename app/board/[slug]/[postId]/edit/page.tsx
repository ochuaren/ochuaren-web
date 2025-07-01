import { StrapiApi } from "@/infra/api/strapi";
import { PostForm } from "@/components/post-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession, Session } from "next-auth";

export default async function Board({
  params: { slug, postId },
}: {
  params: { slug: string; postId: number };
}) {
  const board = await StrapiApi.Board.getBoard(slug).then((response) => {
    return response.data.data[0];
  });

  const post = await StrapiApi.Post.getPostById(postId).then((response) => {
    const data = response.data.data;
    return data;
  });
  const session = await getServerSession<{}, Session>(authOptions);

  return (
    <main className="bg-white min-w-full min-h-full pb-12">
      <div className="min-w-full bg-[#190D87] h-36 flex flex-col justify-center text-[3rem] pl-5 sm:pl-36my-1">
        <span className="text-white">{board?.attributes?.name}</span>
      </div>

      <div className="container mx-auto">
        <div className="text-center text-[1.5rem] mt-3">信息发布页</div>
        <PostForm
          userId={session?.user.id}
          board={board}
          initialData={post}
        ></PostForm>
      </div>
    </main>
  );
}
