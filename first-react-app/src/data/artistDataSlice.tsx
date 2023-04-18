import { lastFM, NewArtistInfo } from "../api/lastFMAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import note from "../assets/note.png";

async function getArtistPictures(artists: NewArtistInfo) {
  for (const artist of artists) {
    const trimmedName = artist.name.replace(/\s+/g, "");
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=967b0e577e1c06b79eeb679cb791b1ec&tags=${trimmedName}&extras=url_l&format=json&nojsoncallback=1`;
    const result = await fetch(url);
    const artistPicture = await result.json();
    if (artistPicture.photos.photo.length === 0) {
      artist.image = note;
    } else {
      artist.image =
        artistPicture.photos.photo[
          Math.floor(Math.random() * artistPicture.photos.photo.length)
        ].url_l;
      if (artist.image === undefined) {
        artistPicture.photos.photo[Math.floor(Math.random() * artistPicture.photos.photo.length)]
          .url_l;
      }
    }
  }
  return artists;
}

export const getArtistByName = createAsyncThunk(
  "artists/getArtistByNameStatus",
  async (artistName: string) => {
    const response = await lastFM.getArtist(artistName);
    if (response === null) return null;
    const artistsWithPictures = await getArtistPictures(response);
    return artistsWithPictures;
  }
);

interface InitialState {
  artists: NewArtistInfo | null;
  status: string;
}

const initialState = {
  artists: null,
  status: "Search an artist to display here",
} as InitialState;

const artistsSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArtistByName.pending, (state) => {
      state.status = "Loading data...";
    }),
      builder.addCase(getArtistByName.fulfilled, (state, action) => {
        state.status = "We have found some artists:";
        if (action.payload === null || action.payload.length === 0) {
          state.status = "No artists with this name were found. Perhaps you made a typo?";
          state.artists = action.payload;
          return;
        }
        state.artists = action.payload;
      }),
      builder.addCase(getArtistByName.rejected, (state) => {
        state.status = "Cannot get data from API. Check your internet connection.";
      });
  },
});

export default artistsSlice.reducer;
