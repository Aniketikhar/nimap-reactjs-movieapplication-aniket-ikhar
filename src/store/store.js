import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./Slices/moviesSlice";
import searchReducer from "./Slices/searchSlice";
import movieDetailsReducer from "./Slices/detailsSlice";
import movieCastReducer from "./Slices/movieCastSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    search: searchReducer,
    movieDetails: movieDetailsReducer,
    movieCast: movieCastReducer
  },
});

export default store;

