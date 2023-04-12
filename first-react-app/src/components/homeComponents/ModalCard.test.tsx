import React from "react";
import { render, screen, act } from "@testing-library/react";
import { vi, Mock } from "vitest";
import ModalCard from "./ModalCard";

const mockCharData: {
  handleModalClose: () => void;
  name: string;
  similar: { name: string }[];
  tags: { name: string }[];
  bio: { published: string; summary: string };
} = {
  handleModalClose: () => console.log("Test"),
  name: "Test name",
  similar: [{ name: "Test Similar" }],
  tags: [{ name: "Test Tag" }],
  bio: { published: "Test Published", summary: "Test Summary" },
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharData),
  })
) as Mock;

describe("Modal Card Test", () => {
  it("Renders modal window correctly", async () => {
    await act(async () => {
      render(
        <ModalCard
          handleModalClose={mockCharData.handleModalClose}
          name={mockCharData.name}
          similar={mockCharData.similar}
          tags={mockCharData.tags}
          bio={{
            published: mockCharData.bio.published,
            summary: mockCharData.bio.summary,
          }}
        ></ModalCard>
      );
    });

    expect(screen.getByText(/Test name/)).toBeInTheDocument();
    expect(screen.getByText(/Test Similar/)).toBeInTheDocument();
    expect(screen.getByText(/Test Tag/)).toBeInTheDocument();
    expect(screen.getByText(/Test Published/)).toBeInTheDocument();
    expect(screen.getByText(/Test Summary/)).toBeInTheDocument();
  });
});
