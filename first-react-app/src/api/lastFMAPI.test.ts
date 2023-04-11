import { describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { lastFM } from "./lastFMAPI";

describe("Testing api calls", () => {
  it("Gets artist name correctly", async () => {
    const result = await lastFM.getArtist("Rammstein");
    expect(result![0]).toHaveProperty("name", "Rammstein");
  });
  it("Gets artist tags correctly", async () => {
    const result = await lastFM.getArtistInfo("Rammstein");
    expect(result!.tags[0]).toHaveProperty("name");
    expect(result!.tags[0]).toHaveProperty("url");
  });
});
