"use client";

import { Button } from "@/components/button";
import { StrapiApi } from "@/infra/api/strapi";
import { useState } from "react";

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsProcessing(true);
    const res = await StrapiApi.Auth.sendForgotPasswordEmail(email);
    if (res.status === 200) {
      window.location.href = "/login/request-password-reset/success";
      setEmail("");
    } else {
      setErrorMessage("提交失败。请重试");
    }
    setIsProcessing(false);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              忘记密码
            </h1>
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit();
              }}
            >
              {errorMessage && (
                <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-5">
                  {errorMessage}
                </div>
              )}
              <div className="pb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  邮箱
                </label>
                <input
                  type="email"
                  name="username"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="输入邮箱"
                />
              </div>
              <Button
                type="submit"
                isProcessing={isProcessing}
                className="w-full"
              >
                提交
              </Button>
              <p className="text-sm font-light text-gray-500 py-5">
                已经有账号？{" "}
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  点此登陆
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
