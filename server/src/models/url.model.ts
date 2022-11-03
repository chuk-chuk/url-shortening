import { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  longUrl: string;
  shortenedUrl: string;
}

export const UrlSchema = new Schema<IUrl>(
  {
    longUrl: { type: String, required: true },
    shortenedUrl: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export const UrlsCollection = "urls";
