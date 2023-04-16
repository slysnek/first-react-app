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
      state.isSearching = false;
    },
    submittingSearch: (state) => {
      state.isSearching = true;
    },
  },
});

export const { addingTextToSearch, submittingSearch } = searchSlice.actions;

export default searchSlice.reducer;
