import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieCast = createAsyncThunk(
  "movieCast/fetchMovieCast",
  async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie cast.");
    }
    const data = await response.json();
    return data.cast;
  }
);

const movieCastSlice = createSlice({
  name: "movieCast",
  initialState: {
    cast: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearCast: (state) => {
      state.details = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieCast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieCast.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cast = action.payload;
      })
      .addCase(fetchMovieCast.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearCast } = movieCastSlice.actions;

export default movieCastSlice.reducer;
