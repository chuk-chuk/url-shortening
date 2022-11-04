import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
import * as api from "./helpers/api";

const mockedResponseWithData = [
  {
    longUrl: "www.test.com",
    shortenedUrl: "https://pbid.io/nxbo6e7gg",
    _id: "536292d5c9204d2f6711b3bd",
  },
  {
    longUrl: "www.google.com",
    shortenedUrl: "https://pbid.io/00bo6e7xx",
    _id: "636292d5c9204d2f6711b3wq",
  },
];

describe("App", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders a component in a default state", async () => {
    jest.spyOn(api, "getUrlsFromApi").mockResolvedValue([]);
    render(<App />);

    await waitFor(() => {
      screen.getByText("Short URL Generator");
      screen.getByText("You can be the first one, enter your URL!");
    });
  });

  it("should render list of shortened urls when api responds", async () => {
    jest.spyOn(api, "getUrlsFromApi").mockResolvedValue(mockedResponseWithData);
    render(<App />);
    await waitFor(() => {
      screen.getByText("List of previously shortened URLs");
      screen.getByText("https://pbid.io/nxbo6e7gg");
      screen.getByText("https://pbid.io/00bo6e7xx");
    });
  });

  it("adds item to the url list", async () => {
    jest.spyOn(api, "getUrlsFromApi").mockResolvedValue([]);
    jest
      .spyOn(api, "postUrlToApi")
      .mockResolvedValue({ code: 200, message: "success" });
    render(<App />);
    await waitFor(() => {
      screen.getByText("Short URL Generator");
    });

    userEvent.type(
      screen.getByTestId("urlInput"),
      "https://www.google.com/pets"
    );
    userEvent.click(screen.getByText("Generate URL"));

    jest.spyOn(api, "getUrlsFromApi").mockResolvedValue([
      {
        longUrl: "https://www.google.com/pets",
        shortenedUrl: "https://pbid.io/nxbo6e7gg",
        _id: "536292d5c9204d2f6711b3bd",
      },
    ]);

    await waitFor(() => {
      expect(screen.getByText("https://pbid.io/nxbo6e7gg")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(
        screen.queryByText("You can be the first one, enter your URL!")
      ).not.toBeInTheDocument();
    });
  });

  describe("errors", () => {
    it("shown when no value entered", async () => {
      jest
        .spyOn(api, "getUrlsFromApi")
        .mockResolvedValue(mockedResponseWithData);
      render(<App />);
      await waitFor(() => {
        screen.getByText("Short URL Generator");
      });

      userEvent.type(screen.getByTestId("urlInput"), "" || "{tab}");
      userEvent.click(screen.getByText("Generate URL"));
      expect(screen.getByText("Paste the long URL")).toBeInTheDocument();
    });

    it("shown when value entered is invalid", async () => {
      jest.spyOn(api, "getUrlsFromApi").mockResolvedValue([]);
      render(<App />);
      await waitFor(() => {
        screen.getByText("Short URL Generator");
      });

      userEvent.type(screen.getByTestId("urlInput"), "dev/");
      userEvent.click(screen.getByText("Generate URL"));
      expect(
        screen.getByText(
          "The URL is not valid, make sure the URL you tried to shorten is correct"
        )
      ).toBeInTheDocument();
    });

    it("shown when url already exists", async () => {
      jest
        .spyOn(api, "getUrlsFromApi")
        .mockResolvedValue(mockedResponseWithData);
      jest
        .spyOn(api, "postUrlToApi")
        .mockResolvedValue({ code: 409, message: "Record already exists." });
      render(<App />);
      await waitFor(() => {
        screen.getByText("Short URL Generator");
      });

      userEvent.type(screen.getByTestId("urlInput"), "www.test.com");
      userEvent.click(screen.getByText("Generate URL"));
      await waitFor(() => {
        expect(screen.getByText("Record already exists.")).toBeInTheDocument();
      });
    });
  });
});
