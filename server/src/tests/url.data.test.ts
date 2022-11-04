import * as data from "../businessLogic/url.businessLogic";
import { IUrl } from "../models/url.model";

const mockedRecords = [
  {
    longUrl: "www.test.com",
    shortenedUrl: "https://pbid.io/eebo6e7gg",
  },
] as IUrl[];

const getResponse = { code: 200, data: mockedRecords };
const errorPostResponse = { data: { code: 409, message: "oops" } };
const successPostResponse = { data: { code: 200, message: "success" } };

describe("url controller", () => {
  it("get api urls data", async () => {
    jest
      .spyOn(data, "getAllUrls")
      .mockImplementation(() => Promise.resolve(getResponse));

    const result = await data.getAllUrls();
    expect(result).toEqual(getResponse);
  });

  it("calls createNewUrl with an error", async () => {
    jest
      .spyOn(data, "createNewUrl")
      .mockImplementation(() => Promise.resolve(errorPostResponse));

    const result = await data.createNewUrl({ longUrl: "" });
    expect(result).toEqual(errorPostResponse);
  });

  it("calls createNewUrl with success", async () => {
    jest
      .spyOn(data, "createNewUrl")
      .mockImplementation(() => Promise.resolve(successPostResponse));

    const result = await data.createNewUrl({ longUrl: "www.new-link.com" });
    expect(result).toEqual(successPostResponse);
  });
});
