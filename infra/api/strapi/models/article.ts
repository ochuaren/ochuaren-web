import { IContentType } from "./content-type";
import { IMedia } from "./listing";

export interface IArticle extends IContentType {
  attributes: {
    headline: string;
    content: string;
    featuredImage: {
      data: IMedia;
    };
  };
}
