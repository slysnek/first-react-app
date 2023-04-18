import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface FormCardsState {
  formCards: JSX.Element[];
}

const initialState: FormCardsState = {
  formCards: [],
};

export const formSlice = createSlice({
  name: "formInSlice",
  initialState,
  reducers: {
    addFormCard: (state, action: PayloadAction<JSX.Element>) => {
      state.formCards.push(action.payload);
    },
  },
});

export const { addFormCard } = formSlice.actions;

export default formSlice.reducer;
