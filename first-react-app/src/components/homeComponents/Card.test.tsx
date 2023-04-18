import React from "react";
import { render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest";
import Card from "./Card";
import { Provider } from "react-redux";
import { store } from "../../data/reduxStore";

const mockCharData: {
  songArtist: string;
  songImage: string;
} = {
  songArtist: "Test Card",
  songImage: "../../assets/note.png",
};

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharData),
  })
) as Mock;

describe("Card Test", () => {
  it("Renders card correctly", async () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <Card songArtist={mockCharData.songArtist} songImage={mockCharData.songImage} />
      </Provider>
    );

    const altText = "The picture isn't accessible anymore on the API website.";

    expect(screen.getByText(/Test Card/)).toBeInTheDocument();
    const image = getByAltText(altText) as HTMLImageElement;

    expect(image.src).toContain("note.png");
    // or
    /* expect(image).toHaveAttribute('src', 'the_url') */
  });
});
