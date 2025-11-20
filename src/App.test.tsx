import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders amount label in currency app", () => {
  render(<App />);
  const labelElement = screen.getByText(/Amount/i);
  expect(labelElement).toBeInTheDocument();
});

test("renders convert button in currency app", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", { name: /Convert/i });
  expect(buttonElement).toBeInTheDocument();
});
