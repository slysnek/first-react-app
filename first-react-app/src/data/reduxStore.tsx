import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import formReducer from "./formSlice";
import cardsReducer from "./cardsSlice";

export const store = configureStore({
  reducer: { searchInStore: searchReducer, formInStore: formReducer, cardsInStore: cardsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
