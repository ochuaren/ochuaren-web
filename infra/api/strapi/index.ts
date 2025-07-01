import * as Listing from "./listing";
import * as HomePage from "./homepage";
import * as Board from "./board";
import * as Post from "./post";
import * as News from "./news";
import * as Auth from "./auth";

export const StrapiApi = {
  ...Listing,
  ...HomePage,
  ...Board,
  ...Post,
  ...News,
  ...Auth,
};
