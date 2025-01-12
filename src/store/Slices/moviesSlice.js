import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ category, page = 1 }) => {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return { category, page, results: data.results, totalPages: data.total_pages };
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    upcoming: [],
    popular: [],
    top_rated: [],
    page: {
      upcoming: 1,
      popular: 1,
      topRated: 1,
    },
    totalPages: {
      upcoming: 1,
      popular: 1,
      topRated: 1,
    },
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
        const { category, page, results, totalPages } = action.payload;
        state.status = "succeeded";
        state.page[category] = page;
        state.totalPages[category] = totalPages;

        if (category === "upcoming") state.upcoming = results;
        if (category === "popular") state.popular = results;
        if (category === "top_rated") state.top_rated = results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
