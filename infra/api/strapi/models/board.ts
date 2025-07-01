import { IContentType } from "./content-type";
import { IMedia } from "./listing";

export interface IBoard extends IContentType {
    name: string;
    slug: string;
    canReply: boolean;
    hideDisclaimer: boolean;
    hidePostMeta: boolean;
    hidePricing: boolean;
    hideCategory: boolean;
    hideWechat: boolean;
    hideCity: boolean;
    hideAddress: boolean;
    hideDate: boolean;
    hidePhone: boolean;
    hideEmail: boolean;
    hideWebsiteUrl: boolean;
    disallowGoBack: boolean;
    requiredApproval: boolean;
    canPost: boolean;
    sort: object;
    icon: IMedia;
}
