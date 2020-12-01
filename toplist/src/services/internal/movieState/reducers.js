import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const movieSlicer = createSlice({
  name: 'movies',
  initialState: {
    byId: {},
    ids: [],
    selected: null,
    config: {},
  },
  reducers: {
    receiveImageConfig: (state, action) => {
      return {
        ...state,
        config: action.payload.images,
      };
    },
    receiveMovies: (state, action) => {
      const byId = {};
      const ids = [];
      _.map(action.payload, (movie) => {
        byId[movie.id] = { ...movie, place: ids.length + 1 };
        ids.push(movie.id);
      });
      return {
        ...state,
        byId,
        ids,
      };
    },
    receiveMovieDetails: (state, action) => {
      const byId = {};
      _.map(action.payload, (movieDetails) => {
        byId[movieDetails.id] = {
          ...state.byId[movieDetails.id],
          ...movieDetails,
        };
      });
      return {
        ...state,
        byId,
      };
    },
    selectMovie: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
  },
});

export const actions = movieSlicer.actions;
export default movieSlicer.reducer;
