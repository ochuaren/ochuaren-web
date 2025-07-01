"use client";

import { Button } from "@/components/button";
import { StrapiApi } from "@/infra/api/strapi";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(true);
  const handleSubmit = async () => {
    setIsProcessing(true);
    // setConfirmed(true);
    // const { data: users } = await StrapiApi.Auth.getUserByEmail(username);
    // if (users.length === 1) {
    //   const user = users[0];
    //   setConfirmed(user.confirmed);
      // if (user.confirmed) {
        const res = await signIn("credentials", {
          username: username,
          password: password,
        });
    //   }
    // }
    setIsProcessing(false);
  };
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              账号登陆
            </h1>
            <form
              method="post"
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSubmit();
              }}
            >
              {props.searchParams.error && confirmed && (
                <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-5">
                  邮箱名或密码错误! 请重试.
                </div>
              )}
              {!confirmed && (
                <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-5">
                  请先验证邮箱!
                </div>
              )}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  邮箱
                </label>
                <input
                  type="email"
                  name="username"
                  id="email"
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="输入邮箱"
                />
              </div>
              <div className="py-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  密码
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="输入密码"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                />
              </div>
              <div className="flex items-center justify-between py-5">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 ">记住此次登陆</label>
                  </div>
                </div>
                <a
                  href="/login/request-password-reset"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  忘记密码？
                </a>
              </div>
              <Button
                type="submit"
                isProcessing={isProcessing}
                className="w-full"
              >
                登陆
              </Button>
              <p className="text-sm font-light text-gray-500 py-5">
                还没有账号？{" "}
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline "
                >
                  点此注册
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
