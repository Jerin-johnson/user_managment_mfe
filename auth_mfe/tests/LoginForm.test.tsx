import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "../src/components/LoginForm";

import { MemoryRouter } from "react-router-dom";
const renderComponent = (onSubmit = jest.fn()) => {
  render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <LoginForm
        title="Test Login"
        onSubmit={onSubmit}
        registerLink="/register"
      />
    </MemoryRouter>,
  );
};

test("should submit form with valid data", async () => {
  const mockSubmit = jest.fn().mockResolvedValue(undefined);

  renderComponent(mockSubmit);

  await userEvent.type(screen.getByLabelText(/email/i), "admin@test.com");
  await userEvent.type(screen.getByLabelText(/password/i), "123456");

  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(mockSubmit).toHaveBeenCalledWith({
    email: "admin@test.com",
    password: "123456",
    rememberMe: true,
  });
});

test("should show validation errors", async () => {
  renderComponent();

  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  expect(await screen.findByText(/at least 6 characters/i)).toBeInTheDocument();
});

test("should show error if submit fails", async () => {
  const mockSubmit = jest.fn().mockRejectedValue(new Error("Invalid login"));

  renderComponent(mockSubmit);

  await userEvent.type(screen.getByLabelText(/email/i), "admin@test.com");
  await userEvent.type(screen.getByLabelText(/password/i), "123456");

  await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

  expect(await screen.findByText(/invalid login/i)).toBeInTheDocument();
});
