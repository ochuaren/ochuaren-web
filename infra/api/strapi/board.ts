import { axiosInstance } from "./axios";
import {
  IStrapiCollectionTypeResponse,
  IStrapiSingleTypeResponse,
} from "./response";
import * as Models from "@/infra/api/strapi/models";

const getBoard = async (slug: string) => {
  return await axiosInstance.get<
    IStrapiCollectionTypeResponse<Models.Board.IBoard>
  >(`/api/boards?filters[slug][$eq]=${slug}&populate=*`);
};

const getBoards = async () => {
  return await axiosInstance.get<
    IStrapiCollectionTypeResponse<Models.Board.IBoard>
  >(`/api/boards?populate=*`);
}

export const getAdvertisements = async () => {
  return await axiosInstance.get<
    IStrapiSingleTypeResponse<Models.Ads.IBoardAdvertisementsType>
  >("/api/advertisement?populate=*");
};

export const Board = {
  getBoard,
  getAdvertisements,
  getBoards
};
