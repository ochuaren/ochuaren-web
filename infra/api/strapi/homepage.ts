import * as Models from "@/infra/api/strapi/models";
import { axiosInstance } from "./axios";
import { IStrapiSingleTypeResponse } from "./response";

const getPageData = async () => {
  return await axiosInstance.get<
    IStrapiSingleTypeResponse<Models.HomePage.HomePageType>
  >("/api/home?populate=*");
};

const getNews = async () => {
  return await axiosInstance.get<
    IStrapiSingleTypeResponse<Models.News.IArticle[]>
  >("/api/news?populate=*");
};

const createLead = async (lead: Models.HomePage.ILeadCreate) => {
  return await axiosInstance.post(`/api/leads`, {
    data: lead,
  });
};

export const Home = {
  getPageData,
  getNews,
  createLead,
};
