import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slices/moviesSlice";
import searchReducer from "./Slices/searchSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
  },
});

export default store;

