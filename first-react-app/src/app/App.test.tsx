import { render, screen } from "@testing-library/react";
import About from "../pages/About";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import { WrappedApp, App } from "./App";
import { Provider } from "react-redux";
import { store } from "../data/reduxStore";

describe("App", () => {
  it("Renders link buttons correctly", () => {
    render(
      <Provider store={store}>
        <WrappedApp />
      </Provider>
    );
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
      <Provider store={store}>
        <MemoryRouter initialEntries={["/forms"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText("Current Page: Forms")).toBeTruthy();
  });
  it("Renders home link button", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <About />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getAllByRole("link")).toBeVisible;
  });
});
