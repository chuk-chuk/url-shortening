import * as mongoose from "mongoose";
import { IUrl, UrlSchema, UrlsCollection } from "./url.model";

export let Url: mongoose.Model<IUrl>;

export let mongoConnection: any;

export class InitMongoModels {
  public static init(connection: any): void {
    Url = connection.model("Url", UrlSchema, UrlsCollection);

    mongoConnection = connection;
  }
}
