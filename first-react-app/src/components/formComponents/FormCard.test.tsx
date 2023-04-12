import React from "react";
import { render, screen, act } from "@testing-library/react";
import { vi, Mock } from "vitest";
import FormCard from "../formComponents/FormCard";

const mockCharData = {
  id: 1,
  songName: "Song Test",
  songDate: "2022-14-14",
  songRating: "5",
  songExplicit: true,
  songAuthor: "Song Author",
  songImage: "../testImage.png",
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharData),
  })
) as Mock;

describe("Form Card Test", () => {
  it("Renders form card correctly", async () => {
    await act(async () => {
      render(
        <FormCard
          songName={mockCharData.songName}
          songDate={mockCharData.songDate}
          songRating={mockCharData.songRating}
          songExplicit={mockCharData.songExplicit === true ? "Yes" : "No"}
          songAuthor={mockCharData.songAuthor}
          songImage={mockCharData.songImage}
          key={mockCharData.id}
        ></FormCard>
      );
    });

    expect(screen.getByText(/Song Test/)).toBeInTheDocument();
    expect(screen.getByText(/2022-14-14/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/Yes/)).toBeInTheDocument();
    expect(screen.getByText(/Song Author/)).toBeInTheDocument();
    expect(screen.getByAltText(`img didn't load :(`)).toBeInTheDocument();
  });
});
