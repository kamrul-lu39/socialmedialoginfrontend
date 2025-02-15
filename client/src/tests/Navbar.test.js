import "@testing-library/jest-dom";
import React, { useRef } from "react"; // ✅ Import useRef explicitly
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

// 🔹 Mock Firebase Auth to prevent API key errors
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
  signOut: jest.fn(),
}));

// 🔹 Mock React's useRef to prevent null errors
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(() => ({ current: { focus: jest.fn() } })), // ✅ Prevents useRef errors
}));

test("renders Navbar component", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
