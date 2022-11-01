import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

describe("Button", () => {
  it("renders a component with the correct title", () => {
    render(<Button title="click me" />);
    const title = screen.getByText("click me");
    expect(title).toBeInTheDocument();
  });

  it("calls onClick", () => {
    const onClickMock = jest.fn();
    render(<Button title="click me" onClick={onClickMock} />);
    const button = screen.getByText("click me");
    userEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
