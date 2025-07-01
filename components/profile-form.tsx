"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "@/infra/api/strapi/models/user";
import { AuthUser } from "@/infra/api/strapi/models/auth-user";
import { Button } from "./button";

export type ProfileInputs = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
};

interface IProfileForm {
  user: AuthUser;
}

export const ProfileForm = ({ user }: IProfileForm) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          名字
        </label>

        <input
          type="text"
          placeholder="名字"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
          {...register("firstName", { required: "First name is required" })}
        />
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          姓氏
        </label>

        <input
          type="text"
          placeholder="姓氏"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
          {...register("lastName", { required: "First name is required" })}
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 "></label>
        邮件地址
        <input
          type="text"
          placeholder="邮件地址"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
          {...register("email", { required: "First name is required" })}
        />
      </div>

      <div className="mt-5">
        <Button type="submit">更新资料</Button>
      </div>
    </form>
  );
};
