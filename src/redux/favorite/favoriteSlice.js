import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
  const favoritesString = localStorage.getItem("favorites");
  return favoritesString ? JSON.parse(favoritesString) : [];
};

const initialState = {
  favoriteItems: loadFavoritesFromLocalStorage(),
};

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const itemExists = state.favoriteItems.some(item => item._id === action.payload._id);
      if (!itemExists) {
        state.favoriteItems.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
      }
    },
    removeFromFavorites: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favoriteItems));
    },
    clearFavorites: (state) => {
      state.favoriteItems = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;