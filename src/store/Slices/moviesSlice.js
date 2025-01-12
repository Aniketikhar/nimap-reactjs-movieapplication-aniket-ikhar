import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (category) => {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    return { category, results: data.results };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    upcoming: [],
    popular: [],
    topRated: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        const { category, results } = action.payload;
        state.status = "succeeded";
        if (category === "upcoming") state.upcoming = results;
        if (category === "popular") state.popular = results;
        if (category === "top_rated") state.topRated = results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
