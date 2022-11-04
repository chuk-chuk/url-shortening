import { UrlModel } from "../models/url.model";

const newURL = {
  _id: "636292d5c9204d2f6711b3cc",
  longUrl: "www.test-3.com",
  shortenedUrl: "https://pbid.io/eebo6e7gg",
};

describe("UrlModel", () => {
  it("should create a new record", async () => {
    const url = new UrlModel(newURL);
    const createdUrl = await url.save();
    expect(createdUrl).toBeDefined();
    expect(createdUrl.longUrl).toBe(newURL.longUrl);
  });
});
