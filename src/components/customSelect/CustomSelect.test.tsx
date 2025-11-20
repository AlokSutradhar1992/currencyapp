import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomSelect from "./CustomSelect";

describe("CustomSelect Component", () => {
  const options = [
    { value: "IND", label: "India" },
    { value: "UAE", label: "United Arab Emirates" },
    { value: "USA", label: "United States of America" },
  ];

  it("renders with placeholder text", () => {
    render(
      <CustomSelect
        options={options}
        value={null}
        onChange={jest.fn()}
        placeholder="Select an option"
      />
    );
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders with the selected value", () => {
    render(
      <CustomSelect options={options} value={options[0]} onChange={jest.fn()} />
    );
    expect(screen.getByText("India")).toBeInTheDocument();
  });
});
