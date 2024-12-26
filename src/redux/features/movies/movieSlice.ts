import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../apis/axiosConfig';
const apiKey = process.env.REACT_APP_API_KEY

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await axiosInstance.get(`/search/movie`, {
      params: {
        api_key: apiKey,
        query,
        page:page
      },
    });
    return response.data;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page: number) => {
    const response = await axiosInstance.get(`/movie/popular`, {
      params: {
        api_key: apiKey,
        page: page,
      },
    });
    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number) => {
    const response = await axiosInstance.get(`/movie/${movieId}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  }
);

const initialState: MovieState = {
  movies: [],
  searchResults: [],
  selectedMovie: null,
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetMovies: (state) => {
      state.movies = [];
      state.searchResults = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = [...state.searchResults,...action.payload.results];
        state.error = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load movies';
      })
      
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies,...action.payload.results];
        state.error = null;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load popular movies';
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load movie details';
      });
  },
});

export const { resetMovies } = movieSlice.actions;

export default movieSlice.reducer;
