import { render, screen } from "@testing-library/react";
import About from "../pages/About";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import { WrappedApp, App } from "./App";

describe("App", () => {
  it("Renders link buttons correctly", () => {
    render(<WrappedApp />);
    expect(screen.getAllByRole("link")).toBeVisible;
  });
  it("Renders 404 page when invalid path", () => {
    render(
      <MemoryRouter initialEntries={["/bla-bla"]}>
        <App />
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Page not found");
  });
  it("Renders forms page", () => {
    render(
      <MemoryRouter initialEntries={["/forms"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Current Page: Forms")).toBeTruthy();
  });
  it("Renders home link button", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );
    expect(screen.getAllByRole("link")).toBeVisible;
  });
});
