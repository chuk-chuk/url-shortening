import { Url } from "../models/initModels";
import { IUrl } from "../models/url.model";

export const getAllUrls = async (): Promise<{
  code: number;
  data: IUrl[];
}> => {
    const urls = await Url.find({});
    return { code: 200, data: urls || [] };
};
