"use client";

import { StrapiApi } from "@/infra/api/strapi";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/button";

type Props = {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Login(props: Props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSubmit = async () => {
    setErrorMessage("");
    setIsProcessing(true);
    if (password !== confirmPassword) {
      setErrorMessage("密码不一致. 请重试.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("密码长度不足6位. 请重试.");
      return;
    }
    const res = await StrapiApi.Auth.resetPassword(
      props.searchParams.code as string,
      password,
      confirmPassword
    );
    if (res.status === 200) {
      setPassword("");
      setConfirmPassword("");
      window.location.href = "/login/reset-password/success";
    } else {
      setErrorMessage("密码重置失败");
    }
    setIsProcessing(false);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              密码重置
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  新密码
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="输入新密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                />
              </div>
              <div className="py-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  确认新密码
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="输入新密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                />
              </div>
              <Button
                type="submit"
                isProcessing={isProcessing}
                className="w-full"
              >
                提交
              </Button>
              <p className="text-sm font-light text-gray-500 pt-5">
                <Link
                  href="/api/auth/signin"
                  className="font-medium text-primary-600 hover:underline underline"
                >
                  点此登陆
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
