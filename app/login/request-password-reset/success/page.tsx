import Link from "next/link";

export const metadata = {
  title: "OC华人信息平台-忘记密码成功",
};

export default function Success() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4"></div>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            提交成功
          </h1>
          <p className="py-5">密码重置邮件已发送，请查收</p>
          <p>
            点此
            <Link className="underline text-blue-600" href="/login">
              “登陆”
            </Link>
          </p>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-4"></div>
        </div>
      </div>
    </section>
  );
}
