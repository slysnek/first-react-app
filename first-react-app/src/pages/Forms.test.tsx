import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import { App } from "../app/App";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { describe } from "vitest";
import { Provider } from "react-redux";
import { store } from "../data/reduxStore";

describe("Form test", () => {
  it("Renders value in text input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/forms"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const res = screen.getByDisplayValue("Best Song In The World");
    expect(res).toHaveValue("Best Song In The World");
  });
  it("Applies hidden class", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/forms"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const error = screen.queryByText(
      "You have to correct errors in form first only then you can submit."
    );

    expect(error).toHaveClass("error-hidden");
  });
  it("Shows radio error", async () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/forms"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    const button = getByText(container, "Submit");

    fireEvent.click(button);

    await waitFor(() => screen.getByText("Need to choose one option"), {
      timeout: 2000,
    });

    const errorMessage = screen.getByText("Need to choose one option");
    expect(errorMessage).toBeVisible();
  });
});
