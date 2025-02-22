import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { charactersSlice } from "./charactersSlice";
import { favoritesSlice } from "./favoritesSlice";
import { houseSlice } from "./houseSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      characters: charactersSlice.reducer,
      favorites: favoritesSlice.reducer,
      house: houseSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const reduxWrapper = createWrapper<AppStore>(makeStore);
