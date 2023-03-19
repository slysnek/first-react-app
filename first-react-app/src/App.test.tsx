import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, it } from "vitest";

import { WrappedApp, App } from "./App";

describe("App", () => {
  it("Renders hello world", () => {
    //ARRANGE
    render(<WrappedApp />);
    //ACT
    //EXPECT
    expect(
      screen.getByRole("heading", {
        level: 1,
      })
    ).toHaveTextContent("Hello World");
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
});
