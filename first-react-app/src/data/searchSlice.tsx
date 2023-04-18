import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  searchText: string;
  isSearching: boolean;
}

const initialState: SearchState = {
  searchText: "",
  isSearching: false,
};

export const searchSlice = createSlice({
  name: "searchInSlice",
  initialState,
  reducers: {
    addingTextToSearch: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
      console.log(state.searchText);
      state.isSearching = false;
    },
    searchActive: (state) => {
      state.isSearching = true;
    },
    searchNotActive: (state) => {
      state.isSearching = false;
    },
  },
});

export const { addingTextToSearch, searchActive, searchNotActive } = searchSlice.actions;

export default searchSlice.reducer;
