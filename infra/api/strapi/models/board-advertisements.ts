import { IContentType } from "./content-type";
import { IMedia } from "./listing";

export interface IBoardAdvertisementsType extends IContentType {
  notice: IMedia;
  boardAd1: IMedia;
  boardAd2: IMedia;
}
