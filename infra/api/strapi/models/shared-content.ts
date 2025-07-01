import { IContentType } from "./content-type";
import { IMedia } from "./listing";

export interface ISharedContent extends IContentType {
  attributes: {
    link: string;
    name: string;
    featuredImage: {
      data: IMedia;
    };
  };
}
