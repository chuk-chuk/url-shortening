import { Schema, Document } from "mongoose";

export interface IUrl extends Document {
    url: string;
  }

export const UrlSchema = new Schema<IUrl>(
    {
        url: { type: String, required: true },
    },
    { timestamps: false }
  );

export const UrlsCollection = "urls";