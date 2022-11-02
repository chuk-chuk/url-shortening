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
  longUrl: string;
}): Promise<{
    data: { code: number, message: string; id?: Types.ObjectId };
}> => {
  if (!createdObject.longUrl) {
    return {  data: { code: 400, message: "Url is required" } };
  }
  const isExisting = await Url.findOne({ longUrl: createdObject.longUrl });

  if (isExisting) {
    return {
      data: {
        code: 409,
        message: "Record already exists.",
      },
    };
  }

  const randomExtension = Math.random().toString(36).slice(4)
  const shortenedUrl = `https://pbid.io/${randomExtension}`

  const isNotUnique = await Url.findOne({ shortenedUrl: shortenedUrl });

  if (isNotUnique) {
    return {
      data: {
        code: 409,
        message: "Shortened URL needs to be unique",
      },
    };
  }

  const recordToCreate = await Url.create({
    longUrl: createdObject.longUrl,
    shortenedUrl
  });

  return {
    data: {
      code: 200,
      message: "Created successfully",
      id: recordToCreate._id,
    },
  };
};