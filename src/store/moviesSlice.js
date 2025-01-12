import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// TMDb API key and base URL
const API_KEY = "4715acc7dbf3dc98003cc8d0c7f01b01";
const BASE_URL = "https://api.themoviedb.org/3";

// AsyncThunk for fetching movies
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
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
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
