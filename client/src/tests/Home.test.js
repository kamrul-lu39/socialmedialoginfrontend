import "@testing-library/jest-dom";  // ✅ Ensure jest-dom is loaded
import React from "react";  // ✅ Fix: Ensure React is imported
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

test("renders Home component", () => {
  render(<Home />);
  expect(screen.getByText(/Welcome to the API Client/i)).toBeInTheDocument(); // ✅ Corrected text
});
