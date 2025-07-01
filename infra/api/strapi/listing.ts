import * as Models from "@/infra/api/strapi/models";
import { axiosInstance } from "./axios";
import { IStrapiCollectionTypeResponse } from "./response";

const getListings = async () => {
  return await axiosInstance.get<
    IStrapiCollectionTypeResponse<Models.Listing.IListing>
  >("/api/Listings?populate[]=thumbnail");
};

export const Listing = {
  getListings,
};
