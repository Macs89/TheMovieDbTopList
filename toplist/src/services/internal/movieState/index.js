import store, { actions } from './reducers';
import _ from 'lodash';
import { handleResponse } from '../../../lib/messages';

function MovieState(dataBase) {
  const getMovies = () => async (dispatch) => {
    const moviePerPage = dataBase.dataPerPage;
    const topListLength = 210;
    const pages = _.range(0, topListLength, moviePerPage);
    const movies = [];
    for (const page in pages) {
      const currentPage = _.toNumber(page) + 1;
      const moviesByPage = await dataBase.getTopRatedMovies({
        page: currentPage,
      });
      dispatch(
        handleResponse({
          result: moviesByPage,
          message: 'We apologies. Please try to refresh the site.',
          success: () => {
            if (currentPage === pages.length) {
              const remainder = topListLength % moviePerPage;
              const leftOverMovies = _.slice(
                moviesByPage.results,
                0,
                remainder
              );
              movies.push(...leftOverMovies);
            } else {
              movies.push(...moviesByPage.results);
            }
          },
        })
      );
    }
    dispatch(actions.receiveMovies(movies));
    await dispatch(getAllMovieDetails());
  };

  const getAllMovieDetails = () => async (dispatch, getState) => {
    const state = getState();
    const ids = _.get(state, ['movies', 'ids']);
    const movieDetails = [];
    for (const id of ids) {
      const details = await dataBase.getMovieDetails(id);
      dispatch(
        handleResponse({
          result: details,
          message: 'We apologies. Please try to refresh the site.',
          success: () => movieDetails.push(details),
        })
      );
    }
    dispatch(actions.receiveMovieDetails(movieDetails));
  };

  const getDatabaseBasicUrlInfo = () => async (dispatch) => {
    const config = await dataBase.getConfiguration();
    dispatch(
      handleResponse({
        result: config,
        message: 'We apologies. Please try to refresh the site.',
        success: () => dispatch(actions.receiveImageConfig(config)),
      })
    );
  };

  const selectMovie = (id) => async (dispatch) => {
    dispatch(actions.selectMovie(id));
  };

  return Object.freeze({
    getMovies,
    getAllMovieDetails,
    getDatabaseBasicUrlInfo,
    selectMovie,
    store,
  });
}

MovieState.$inject = ['dataBase'];
MovieState.$name = 'movieState';
MovieState.$type = 'service';

export default MovieState;
