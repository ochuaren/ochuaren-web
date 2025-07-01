"use client";

import { IMedia } from "@/infra/api/strapi/models/listing";
import {
  BsFillChatDotsFill,
  BsFillEnvelopePaperFill,
  BsFillTelephoneFill,
} from "react-icons/bs";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { StrapiApi } from "@/infra/api/strapi";
import classNames from "classnames";
import { useState } from "react";
import { Button } from "./button";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};

export const Footer = ({ qrcode }: { qrcode?: IMedia }) => {
  const { register, handleSubmit, control, reset } = useForm<Inputs>();
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await StrapiApi.Home.createLead(data);
    if (response.status === 200) {
      alert("提交成功");
      reset();
    }
    setIsProcessing(false);
  };

  const inputClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5";

  return (
    <div
      className="container min-w-full grid grid-cols-1 sm:grid-cols-2 text-white"
      id="contact-us"
    >
      <div className="bg-blue-700 py-12 w-full h-full">
        <div className="flex flex-col justify-between h-full items-center">
          <div className="font-bold text-[1.25rem] w-96">
            联系我们 / 投诉与建议 / 广告位
          </div>
          <div className="flex flex-row items-center w-96 py-5 sm:py-0">
            <div className="w-16">
              <BsFillChatDotsFill size="36px" color="ffffff" />
            </div>
            <div className="px-10">
              <div>微信号</div>
              <div>ochuareninc</div>
            </div>
          </div>
          <div className="flex flex-row items-center w-96">
            <div className="w-16">
              <BsFillEnvelopePaperFill size="36px" color="#ffffff" />
            </div>
            <div className="px-10">
              <div>邮箱</div>
              <div>ochuaren@gmail.com</div>
            </div>
          </div>
          <div className="flex flex-row items-center w-96">
            <div className="w-16">
              <BsFillTelephoneFill size="36px" color="ffffff" />
            </div>
            <div className="px-10">
              <div>电话（仅短信）</div>
              <div>9493811557</div>
            </div>
          </div>
          <div className="flex flex-row items-center w-96 py-5 sm:py-0">
            <div className="w-24">
              {qrcode && (
                <Image
                  src={qrcode.attributes.url}
                  alt="qr code"
                  width={qrcode.attributes.width}
                  height={qrcode.attributes.height}
                />
              )}
            </div>
            <div className="px-10">
              <div>扫一扫二维码</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between px-5 text-black p-12">
        <div className="text-blue-700 font-bold text-[1.25rem]">在线留言</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-between">
            <div className="mt-5">
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="请输入你的名字"
                className={classNames("w-full py-3", inputClassName)}
              />
            </div>
            <div className="mt-5">
              <input
                type="text"
                {...register("email", { required: true })}
                placeholder="请输入你的邮箱"
                className={classNames("w-full py-3", inputClassName)}
              />
            </div>
            <div className="mt-5">
              <textarea
                {...register("message", { required: true })}
                placeholder="请输入留言内容"
                className={classNames("w-full p-5", inputClassName)}
              ></textarea>
            </div>
            <div className="mt-5 flex justify-center">
              <Button type="submit" isProcessing={isProcessing}>
                提交留言
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
