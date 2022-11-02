import { Types } from "mongoose";
import { Url } from "../models/initModels";
import { IUrl } from "../models/url.model";

export const getAllUrls = async (): Promise<{
  code: number;
  data: IUrl[];
}> => {
    const urls = await Url.find({});
    return { code: 200, data: urls || [] };
};

export const createNewUrl = async (createdObject: {
  url: string;
}): Promise<{
    code: number;
    data: { message: string; id?: Types.ObjectId };
}> => {
  if (!createdObject.url) {
    return { code: 400, data: { message: "Url is required" } };
  }
  const isExisting = await Url.findOne({ longUrl: createdObject.url });

  if (isExisting) {
    return {
      code: 409,
      data: {
        message: "Record already exists.",
      },
    };
  }

  const randomExtension = Math.random().toString(36).slice(4)
  const shortenedUrl = `https://pbid.io/${randomExtension}`

  const isNotUnique = await Url.findOne({ shortenedUrl: shortenedUrl });

  if (isNotUnique) {
    return {
      code: 409,
      data: {
        message: "Shortened URL needs to be unique",
      },
    };
  }

  const recordToCreate = await Url.create({
    longUrl: createdObject.url,
    shortenedUrl
  });

  return {
    code: 200,
    data: {
      message: "Created successfully",
      id: recordToCreate._id,
    },
  };
};