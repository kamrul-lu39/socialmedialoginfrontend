import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

test("renders Login component", () => {
  render(<Login />);
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});

test("calls login function when button is clicked", () => {
  render(<Login />);
  const button = screen.getByRole("button", { name: /Login/i });
  fireEvent.click(button);
  expect(button).toBeDisabled(); // Assuming button gets disabled on click
});
