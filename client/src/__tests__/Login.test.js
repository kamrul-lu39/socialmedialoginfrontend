import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/Login";

test("renders login button", () => {
  render(<Login />);
  const button = screen.getByText(/login/i);
  expect(button).toBeInTheDocument();
});

test("shows error on empty login", () => {
  render(<Login />);
  const button = screen.getByText(/login/i);
  fireEvent.click(button);
  expect(screen.getByText(/please enter your credentials/i)).toBeInTheDocument();
});
