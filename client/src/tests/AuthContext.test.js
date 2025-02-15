import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { act } from "react-dom/test-utils";

test("checks if authentication context works", async () => {
  let loginWithGoogle;
  function TestComponent() {
    const auth = useAuth();
    loginWithGoogle = auth.loginWithGoogle;
    return <div>{auth.user ? "Logged In" : "Logged Out"}</div>;
  }

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  expect(screen.getByText("Logged Out")).toBeInTheDocument();

  await act(() => loginWithGoogle());

  expect(screen.getByText("Logged In")).toBeInTheDocument();
});
