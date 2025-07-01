import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ProfileForm } from "@/components/profile-form";
import { StrapiApi } from "@/infra/api/strapi";
import { getServerSession, Session } from "next-auth";

export default async function Profile() {
  const session = await getServerSession<{}, Session>(authOptions);
  const { data } = await StrapiApi.Auth.getUser(session?.user.id ?? "");

  return (
    <div>
      <span className=" w-full text-black text-[1.25rem] rounded-md">
        个人资料
      </span>
      <hr />
      <div className="w-full bg-white rounded-lg sm:max-w-lg xl:p-0 mt-3">
        <ProfileForm user={data} />
      </div>
    </div>
  );
}
