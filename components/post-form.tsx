"use client";
import { IBoard } from "@/infra/api/strapi/models/board";
import { IPost } from "@/infra/api/strapi/models/post";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextEditor } from "./editor";
import { Uploader } from "./uploader";
import { StrapiApi } from "@/infra/api/strapi";
import { Button, Select, TextInput } from "flowbite-react";
import { useState } from "react";

export type PostInputs = {
  id?: number;
  board: number;
  title: string;
  content: string;
  city: string;
  category: string;
  contactPhone: string;
  contactEmail: string;
  wechat: string;
  price: number;
  attachments: any[];
  author: number;
  address: string;
  refreshedAt: string;
  featured: boolean;
  websiteUrl: string;
};

interface IPostForm {
  initialData?: IPost;
  board: IBoard;
  userId?: string;
}

export const PostForm = ({ board, initialData, userId }: IPostForm) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PostInputs>({
    defaultValues: initialData
      ? {
          ...initialData.attributes,
          board: initialData.attributes.board?.data?.id,
          author: initialData.attributes.author?.data.id,
          attachments: initialData?.attributes?.attachments.data,
        }
      : { refreshedAt: new Date().toISOString(), featured: false },
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<PostInputs> = async (data) => {
    setIsProcessing(true);
    const response = initialData
      ? await StrapiApi.Post.editPost({
          id: initialData.id,
          ...data,
          board: board?.id ?? 0,
        })
      : await StrapiApi.Post.createPost({
          ...data,
          board: board?.id ?? 0,
        });

    if (response.status === 200) {
      reset();
      window.location.href = "/account/posts";
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="form" className="mx-5">
      <input type="hidden" {...register("board", { value: board?.id })} />
      <input type="hidden" {...register("author", { value: Number(userId) })} />
      <div>
        <TextInput
          type="text"
          placeholder="标题"
          className="my-5 w-full"
          {...register("title", { required: "Title is required" })}
        />
      </div>
      <div className="!h-96 shadow relative overflow-hidden">
        <TextEditor control={control} {...register("content")} />
      </div>
      <div className="my-5">
        <Uploader control={control} name="attachments" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {!board?.attributes.hidePricing && (
          <div className="flex items-center">
            <span className="w-28">价格</span>
            <TextInput
              className="w-1/2"
              type="text"
              placeholder="价格"
              {...register("price", { valueAsNumber: true })}
            />
          </div>
        )}
        {!board?.attributes.hidePhone && (
          <div className="flex items-center">
            <span className="w-28">联系人电话</span>
            <TextInput
              className="w-1/2"
              type="text"
              placeholder=""
              {...register("contactPhone")}
            />
          </div>
        )}
        {!board?.attributes.hideCategory && (
          <div className="flex items-center">
            <span className="w-28">分类</span>
            <Select className="w-1/2" {...register("category")}>
              <option value=""></option>
              <option value="出租">出租</option>
              <option value="求租">求租</option>
            </Select>
          </div>
        )}
        {!board?.attributes.hideWechat && (
          <div className="flex items-center">
            <span className="w-28">联系人微信</span>
            <TextInput
              className="w-1/2"
              type="text"
              placeholder=""
              {...register("wechat")}
            />
          </div>
        )}
        {!board?.attributes.hideCity && (
          <div className="flex items-center">
            <span className="w-28">*城市</span>
            <Select
              className="w-1/2"
              aria-invalid={errors.city ? "true" : "false"}
              {...register("city", { required: "City is required" })}
            >
              <option value=""></option>
              <option value="Aliso Viejo">Aliso Viejo</option>
              <option value="Anaheim">Anaheim</option>
              <option value="Brea">Brea</option>
              <option value="Buena Park">Buena Park</option>
              <option value="Costa Mesa">Costa Mesa</option>
              <option value="Cypress">Cypress</option>
              <option value="Dana Point">Dana Point</option>
              <option value="Fountain Valley">Fountain Valley</option>
              <option value="Fullerton">Fullerton</option>
              <option value="Garden Grove">Garden Grove</option>
              <option value="Huntington Beach">Huntington Beach</option>
              <option value="Irvine">Irvine</option>
              <option value="La Habra">La Habra</option>
              <option value="La Palma">La Palma</option>
              <option value="Laguna Beach">Laguna Beach</option>
              <option value="Laguna Hills">Laguna Hills</option>
              <option value="Laguna Niguel">Laguna Niguel</option>
              <option value="Laguna Woods">Laguna Woods</option>
              <option value="Lake Forest">Lake Forest</option>
              <option value="Los Alamitos">Los Alamitos</option>
              <option value="Mission Viejo">Mission Viejo</option>
              <option value="Newport Beach">Newport Beach</option>
              <option value="Orange">Orange</option>
              <option value="Placentia">Placentia</option>
              <option value="Rancho Santa Margarita">
                Rancho Santa Margarita
              </option>
              <option value="San Clemente">San Clemente</option>
              <option value="San Juan Capistrano">San Juan Capistrano</option>
              <option value="Santa Ana">Santa Ana</option>
              <option value="Seal Beach">Seal Beach</option>
              <option value="Stanton">Stanton</option>
              <option value="Tustin">Tustin</option>
              <option value="Villa Park">Villa Park</option>
              <option value="Westminster">Westminster</option>
              <option value="Yorba Linda">Yorba Linda</option>
            </Select>
          </div>
        )}
        {!board?.attributes.hideAddress && (
          <div className="flex items-center">
            <span className="w-28">地址</span>
            <TextInput
              className="w-1/2"
              type="text"
              placeholder=""
              {...register("address")}
            />
          </div>
        )}
        {!board?.attributes.hideEmail && (
          <div className="flex items-center">
            <span className="w-28">联系人邮箱</span>
            <TextInput
              type="text"
              placeholder=""
              className="w-1/2"
              {...register("contactEmail")}
            />
          </div>
        )}
        {!board?.attributes.hideWebsiteUrl && (
          <div className="flex items-center">
            <span className="w-28">官方网站</span>
            <TextInput
              type="text"
              placeholder=""
              className="w-1/2"
              {...register("websiteUrl")}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          isProcessing={isProcessing}
          type="submit"
          className="bg-[#190D87] text-[1.5rem] text-white rounded-md"
        >
          {initialData?.id
            ? "更新内容"
            : board.attributes.requiredApproval
            ? "提交审核"
            : "立即发布"}
        </Button>
      </div>
    </form>
  );
};
