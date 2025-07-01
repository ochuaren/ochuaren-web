import Link from "next/link";

export const metadata = {
  title: "OC华人信息平台-账号激活成功",
};

export default function Success() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4"></div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            账号激活成功
          </h1>
          <p className="py-5">
            点击
            <Link className="underline text-blue-600" href="/login">
              “这里”
            </Link>
            即可登陆
          </p>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4"></div>
        </div>
      </div>
    </section>
  );
}
