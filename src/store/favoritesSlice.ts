import { createSlice } from "@reduxjs/toolkit";

interface FavoritesState {
  favoriteNames: string[];
}

const initialFavState: FavoritesState = {
  favoriteNames: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState: initialFavState,
  reducers: {
    toggleFavorite: (state, action) => {
      const name = action.payload;
      if (state.favoriteNames.includes(name)) {
        state.favoriteNames = state.favoriteNames.filter((fav) => fav !== name);
      } else {
        state.favoriteNames.push(name);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
