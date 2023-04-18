import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HomeCardsState {
  cards: JSX.Element[];
}

const initialState: HomeCardsState = {
  cards: [],
};

export const cardSlice = createSlice({
  name: "cardsInSlice",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<JSX.Element>) => {
      state.cards.push(action.payload);
    },
  },
});

export const { addCard } = cardSlice.actions;

export default cardSlice.reducer;