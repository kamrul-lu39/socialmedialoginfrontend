import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import axios from "axios";

// 🔹 Mock API Call
jest.mock("axios");

test("renders Dashboard and fetches data", async () => {
  axios.get.mockResolvedValue({ data: [{ id: "1", name: "Test Item" }] });

  render(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByText(/Test Item/i)).toBeInTheDocument();
  });
});
