import { axiosInstance } from "./axios";
import { IStrapiSingleTypeResponse } from "./response";
import * as Models from "@/infra/api/strapi/models";

const getArticle = async (articleId: number) => {
  return await axiosInstance.get<
    IStrapiSingleTypeResponse<Models.News.IArticle>
  >(`/api/news/${articleId}?populate=*`);
};

export const News = {
  getArticle,
};
