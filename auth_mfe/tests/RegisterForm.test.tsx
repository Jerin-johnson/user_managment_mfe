import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "../src/components/RegisterForm";

import { MemoryRouter } from "react-router-dom";
const renderComponent = (onSubmit = jest.fn()) => {
  render(
    <MemoryRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <RegisterForm
        title="Test Login"
        onSubmit={onSubmit}
        loginLink="/register"
        subtitle="Register Testing"
      />
    </MemoryRouter>,
  );
};

test("title login to be in the document", async () => {
  renderComponent();

  expect(screen.getByText(/test login/i)).toBeInTheDocument();
});
