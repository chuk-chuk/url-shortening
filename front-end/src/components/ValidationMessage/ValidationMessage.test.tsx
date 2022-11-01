import { render, screen } from "@testing-library/react";
import ValidationMessage from "./ValidationMessage";

describe("ValidationMessage", () => {
  it("renders a component of a type success", () => {
    render(
      <ValidationMessage type="success">Hello message!</ValidationMessage>
    );
    const content = screen.getByText("Hello message!");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("text-green-500");
  });

  it("renders a component of a type error", () => {
    render(<ValidationMessage type="error">No message!</ValidationMessage>);
    const content = screen.getByText("No message!");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("text-red-500");
  });

  it("renders a component of a type custom", () => {
    render(<ValidationMessage type="custom">Message!</ValidationMessage>);
    const content = screen.getByText("Message!");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("text-gray-600");
  });
});
