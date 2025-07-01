"use client";

import { StrapiApi } from "@/infra/api/strapi";
import { AxiosError } from "axios";
import classNames from "classnames";
import { Button } from "@/components/button";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  displayName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  role: number;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      role: 13,
    },
  });

  const [serverError, setServerError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setServerError(null);
    setIsProcessing(true);
    try {
      const response = await StrapiApi.Auth.createUser({
        ...data,
      });
      console.log(response.status);
      if (response.status === 201) {
        await StrapiApi.Auth.sendConfirmation(data.email);
        window.location.href = "/register/success";
        reset();
      }
      if ((response.status === 400)) {
        console.log(response.data.error.message);
        setServerError(response.data.error.message);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setServerError('Bad Email');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5";

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              新用户注册
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              id="form"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  用户名
                </label>
                <input
                  type="text"
                  {...register("displayName", {
                    required: "Display Name is required",
                    minLength: 6,
                  })}
                  id="name"
                  className={classNames(inputClassName, {
                    "focus:!border-red-600":
                      errors.displayName?.type === "required",
                    "outline-red-600": errors.displayName?.type === "required",
                    "!border-red-600": errors.displayName?.type === "required",
                  })}
                  placeholder="输入用户名"
                />
                {errors.displayName && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    用户名至少6个字符以上
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  注册邮箱
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: true,
                    onBlur: (evt) => {
                      const email = evt.target.value;
                      setValue("username", email);
                    },
                  })}
                  id="email"
                  className={classNames(inputClassName, {
                    "focus:!border-red-600":
                      errors.displayName?.type === "required",
                    "outline-red-600": errors.email?.type === "required",
                    "!border-red-600": errors.email?.type === "required",
                  })}
                  placeholder="输入邮箱"
                />
                {errors.email && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    邮箱格式不正确
                  </span>
                )}
                {serverError && serverError.includes("Email") && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    邮箱已经被注册
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  登陆密码
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  id="password"
                  placeholder="点击输入密码"
                  className={classNames(inputClassName, {
                    "focus:!border-red-600": errors.displayName?.type,
                    "outline-red-600": errors.password?.type,
                    "!border-red-600": errors.password?.type,
                  })}
                />
                {errors.password && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    密码至少6个字符以上
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  确认密码
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                    validate: (val: string) => {
                      if (watch("password") != val) {
                        return "密码不一致";
                      }
                    },
                  })}
                  id="confirmPpassword"
                  placeholder="再次输入密码"
                  className={classNames(inputClassName, {
                    "focus:!border-red-600": errors.displayName?.type,
                    "outline-red-600": errors.confirmPassword?.type,
                    "!border-red-600": errors.confirmPassword?.type,
                  })}
                />
                {errors.confirmPassword && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    两次输入的密码不一致
                  </span>
                )}
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    {...register("termsAccepted", {
                      required: "Please accept terms and conditions.",
                    })}
                    aria-describedby="terms"
                    type="checkbox"
                    className={classNames(inputClassName, {
                      "focus:!border-red-600": errors.termsAccepted?.type,
                      "outline-red-600": errors.termsAccepted?.type,
                      "!border-red-600": errors.termsAccepted?.type,
                    })}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    className={classNames("font-light text-gray-500 ", {
                      "!text-red-600":
                        errors.termsAccepted?.type === "required",
                    })}
                  >
                    我同意并接受{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline "
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <Button
                type="submit"
                isProcessing={isProcessing}
                className="w-full"
              >
                创建账号
              </Button>
              <p className="text-sm font-light text-gray-500 ">
                已有账号？{" "}
                <Link
                  href="/api/auth/signin"
                  className="font-medium text-primary-600 hover:underline "
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
