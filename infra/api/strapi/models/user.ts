import { IContentType } from "./content-type";

export interface IUser extends IContentType {
  attributes: {
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
