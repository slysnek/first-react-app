import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import formReducer from "./formSlice";
import artistsReducer from "./artistDataSlice";
import artistsInfoReducer from "./artistModalCardSlice";

export const store = configureStore({
  reducer: {
    searchInStore: searchReducer,
    formInStore: formReducer,
    artistsInStore: artistsReducer,
    artistsInfoStore: artistsInfoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
