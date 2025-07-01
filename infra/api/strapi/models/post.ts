import { IBoard } from "./board";
import { IComment } from "./comment";
import { IContentType } from "./content-type";
import { IMedia } from "./listing";
import { IUser } from "./user";

export interface IPost extends IContentType {
title: string;
    content: string;
    author?: {
      data: IUser;
    };
    featured?: boolean;
    board: IBoard;
    price: number;
    contactPhone?: string;
    contactEmail?: string;
    category: string;
    address: string;
    city: string;
    wechat: string;
    websiteUrl: string;
    attachments: IMedia[];
    comments: IComment[];
    createdAt: string;
    refreshedAt: string;
}

export interface IPostCreate {
  id?: number;
  title: string;
  content: string;
  featured?: boolean;
  board: number;
  price: number;
  contactPhone?: string;
  contactEmail?: string;
  city: string;
  wechat: string;
  attachments: number[];
}
