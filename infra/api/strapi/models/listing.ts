import { IContentType } from "./content-type";
import { alt } from "joi";

export interface ImageFormat {
  name: string;
  width: number;
  height: number;
  url: string;
  size: number;
}

export interface IMedia extends IContentType {
  name: string;
  mime: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    larger: ImageFormat;
  };
}

export interface IListing extends IContentType {
  link: string;
  name: string;
  slug: string;
  thumbnail: {
    data: IMedia;
  };
}
