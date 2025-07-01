import { IContentType } from "./content-type";
import { IListing, IMedia } from "./listing";
import { ISharedContent } from "./shared-content";

export interface HomePageType extends IContentType {
  logo: IMedia;
  heroes: IMedia[];
  categoryImage: {
    data: IMedia;
  };
  listings: IListing[];
  productsHeading: string;
  products: IListing[];
  gallery: IMedia[];
  galleryHeading: string;
  gallery2: IMedia[];
  gallery2Heading: string;
  bottomPhoto: IMedia;
  contactPhoto: IMedia;
  sharings: {
    data: ISharedContent[];
  };
  a: {
    data: IMedia;
  };
  b: {
    data: IMedia;
  };
  c: {
    data: IMedia;
  };
  d: {
    data: IMedia;
  };
  listingBgImage: {
    data: IMedia;
  };
  gallery3: {
    data: IMedia[];
  };
  aboutUs: {
    data: IMedia;
  };
  footer: {
    data: IMedia;
  };
  reviewContent: string;
  vendorContent: string;
  qrcode: {
    data: IMedia;
  };
}

export interface ILeadCreate {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}
