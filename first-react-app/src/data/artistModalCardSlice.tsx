import { ArtistModalInfo, lastFM } from "../api/lastFMAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getArtistModalInfo = createAsyncThunk(
  "artists/getArtistByInfoStatus",
  async (artistName: string) => {
    const response = await lastFM.getArtistInfo(artistName);
    if (response === null) return null;
    return response;
  }
);

interface InitialArtistInfoState {
  artistsInfo: ArtistModalInfo | null;
  status: string;
  isModalActive: boolean;
}

const initialState = {
  artistsInfo: null,
  status: "Modal",
  isModalActive: false,
} as unknown as InitialArtistInfoState;

const artistsInfoSlice = createSlice({
  name: "artistsModalInfo",
  initialState,
  reducers: {
    changeModal: (state, action) => {
      state.isModalActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArtistModalInfo.pending, (state) => {
      state.status = "Loading modal...";
    }),
      builder.addCase(getArtistModalInfo.fulfilled, (state, action) => {
        state.status = "Modal is Active";
        if (action.payload === null) {
          return;
        }
        state.artistsInfo = action.payload;
      }),
      builder.addCase(getArtistModalInfo.rejected, (state) => {
        state.status = "Modal didn't load. Please try again.";
      });
  },
});

export const { changeModal } = artistsInfoSlice.actions;

export default artistsInfoSlice.reducer;
