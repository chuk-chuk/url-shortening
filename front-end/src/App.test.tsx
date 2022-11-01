import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("renders a component in a default state", () => {
    render(<App />);
    expect(screen.getByText("Short URL Generator")).toBeInTheDocument();
    expect(
      screen.getByText("You can be the first one, enter your URL!")
    ).toBeInTheDocument();
  });

  it("adds item to the urls list", () => {
    render(<App />);
    userEvent.type(
      screen.getByTestId("urlInput"),
      "https://www.google.com/pets"
    );
    userEvent.click(screen.getByText("Generate URL"));
    expect(screen.getByText("https://www.google.com/pets")).toBeInTheDocument();
    expect(
      screen.queryByText("You can be the first one, enter your URL!")
    ).not.toBeInTheDocument();
  });

  it("shows an error message when no value entered", () => {
    render(<App />);
    userEvent.type(screen.getByTestId("urlInput"), "" || "{tab}");
    userEvent.click(screen.getByText("Generate URL"));
    expect(screen.getByText("Paste the long URL")).toBeInTheDocument();
  });

  it("shows an error message when value entered is invalid", () => {
    render(<App />);
    userEvent.type(screen.getByTestId("urlInput"), "dev/");
    userEvent.click(screen.getByText("Generate URL"));
    expect(screen.getByText("URL isn't valid")).toBeInTheDocument();
  });
});
