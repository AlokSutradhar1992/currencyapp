import { render, screen } from "@testing-library/react";
import CustomButton from "./CustomButton";

describe("CustomButton Component", () => {
  it("renders the button with the given title", () => {
    render(<CustomButton title="Convert" />);
    expect(screen.getByRole("button")).toHaveTextContent("Convert");
  });

  it("sets the correct type attribute", () => {
    render(<CustomButton title="Convert" type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });
});
