import request from "supertest";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import app from "../app";

dotenv.config();

const baseURL = "http://localhost:8000";

const newURL = {
  _id: "636292d5c9204d2f6711b3cc",
  longUrl: "www.test-3.com",
  shortenedUrl: "https://pbid.io/eebo6e7gg",
};

const urlData = [
  {
    _id: "636292d5c9204d2f6711b3aa",
    longUrl: "www.test-1.com",
    shortenedUrl: "https://pbid.io/nxbo6e7gg",
  },
  {
    _id: "636292d5c9204d2f6711b3bb",
    longUrl: "www.test-2.com",
    shortenedUrl: "https://pbid.io/xxbo6e7gg",
  },
];

describe("Server", () => {
  // for strange reason I cannot establish a connection with the testing db
  beforeEach(async () => {
    await mongoose.createConnection(process.env.MONGO_TEST_URI!);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe("Errors", () => {
    it("returns 404 for unknown route", async () => {
      const res = await request(app).get("/all-urls");
      expect(res.statusCode).toBe(404);
      expect(res.text).toEqual("Cannot find provided route");
    });

    it.skip("should return all urls", async () => {
      const res = await request(app).get("/urls");
      expect(res.statusCode).toBe(200);
    });
  });
});
