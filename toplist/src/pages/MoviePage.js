import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { findAll } from '../lib/filter';

const MoviePage = ({ movie, config }) => {
  const movieId = _.get(movie, 'id');
  const genres = _.join(
    _.map(_.get(movie, ['genres'], []), (genre) => genre.name),
    ', '
  );
  const baseUrl = _.get(config, 'secure_base_url');
  const posterUrls = _.map(_.get(config, 'poster_sizes'), (posterSize) => (
    <Link
      key={`${movieId}-${posterSize}`}
      href={`${baseUrl}${posterSize}${_.get(movie, 'poster_path')}`}
      target="_blank"
    >
      {`${posterSize} size, `}
    </Link>
  ));
  const tmdbUrl = `https://www.themoviedb.org/movie/${movieId}`;
  const tmdbLink = (
    <Link href={tmdbUrl} target="_blank">
      {tmdbUrl}
    </Link>
  );

  const directors = findAll(_.get(movie, ['credits', 'crew']), {
    job: 'Director',
  });
  const directorNames = _.map(directors, (director) => director.name);

  const movieData = [
    { label: 'Title', value: _.get(movie, 'title') },
    { label: 'Length(min.)', value: _.get(movie, 'runtime') },
    { label: 'Genre(s)', value: genres },
    { label: 'Release Date', value: _.get(movie, 'release_date') },
    { label: 'Overview', value: _.get(movie, 'overview') },
    { label: 'Poster', value: posterUrls },
    { label: 'tmdb id', value: movieId },
    { label: 'Vote average', value: _.get(movie, 'vote_average') },
    { label: 'Vote count', value: _.get(movie, 'vote_count') },
    { label: 'tmdb url', value: tmdbLink },
    { label: 'Director(s)', value: _.join(directorNames, ', ') },
  ];
  return (
    <Paper>
      <TableContainer>
        <Table size="medium">
          <TableBody>
            {_.map(movieData, (data, index) => (
              <TableRow key={index}>
                <TableCell varian="head">{data.label}</TableCell>
                <TableCell>{data.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
const mapStateToProps = ({ movies: { selected, byId, config } }) => ({
  movie: _.get(byId, selected),
  config,
});

export default connect(mapStateToProps, null)(MoviePage);
