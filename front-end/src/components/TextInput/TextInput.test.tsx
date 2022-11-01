import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders a component with the correct placeholder", () => {
    render(<TextInput id="name" placeholder="type here" />);
    const input = screen.getByPlaceholderText("type here");
    expect(input).toBeInTheDocument();
  });

  it("calls onChange", () => {
    const onChangeMock = jest.fn();
    render(
      <TextInput data-testid="test-input" id="name" onChange={onChangeMock} />
    );
    const input = screen.getByTestId("test-input");
    userEvent.type(input, "hello");
    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });
});
