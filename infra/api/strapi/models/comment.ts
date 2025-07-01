import { IContentType } from "./content-type";
import { IUser } from "./user";

export interface IComment extends IContentType {
  attributes: {
    content: string;
    author: IUser;
  };
}

export interface ICommentCreate {
  post: number;
  content: string;
}
