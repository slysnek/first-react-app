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

export const counterSlice = createSlice({
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

// Action creators are generated for each case reducer function
export const { addingTextToSearch, submittingSearch } = counterSlice.actions;

export default counterSlice.reducer;
