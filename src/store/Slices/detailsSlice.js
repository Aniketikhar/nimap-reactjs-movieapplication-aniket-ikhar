import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";


export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details.");
    }
    const data = await response.json();
    return data;
  }
);

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState: {
    details: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearDetails: (state) => {
      state.details = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.details = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearDetails } = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
