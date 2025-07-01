import { IContentType } from "./content-type";
import { IMedia } from "./listing";

export interface IBoardAdvertisementsType extends IContentType {
  attributes: {
    notice: {
      data: IMedia;
    };
    boardAd1: {
      data: IMedia;
    };
    boardAd2: {
      data: IMedia;
    };
  };
}
