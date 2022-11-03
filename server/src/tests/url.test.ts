import request from "supertest";
import app from "../app";

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
  describe("Errors", () => {
    it("returns 404 for unknown route", async () => {
      const res = await request(app).get("/all-urls");
      expect(res.statusCode).toBe(404);
      expect(res.text).toEqual("Cannot find provided route");
    });
    it("returns 500 when no db connection", async () => {
      const res = await request(app).get("/urls");
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ message: "Error retrieving urls" });
    });
  });
});
