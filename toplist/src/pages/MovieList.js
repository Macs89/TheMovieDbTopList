import React, { useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import TablePagination from '@material-ui/core/TablePagination';
import TableCellWithSorting from '../components/TableCellWithSort';
import SearchField from '../components/SearchField';
import ViewButton from '../components/ViewButton';
import {
  filterByText,
  getOrderedDataByPage,
  getNewOrderDirecton,
} from '../lib/filter';
import container from '../container';

const movieState = container.movieState;
const History = container.history;

const MovieList = ({ movies, baseUrl, selectMovie }) => {
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('place');
  const [search, setSearch] = useState('');

  const handleOrderChange = (event, newOrderBy) => {
    const newOrder = getNewOrderDirecton(orderBy, newOrderBy, order);
    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };

  const filteredMovies = filterByText(movies, 'title', search);

  const handleClick = (id) => {
    const path = `/movies/${id}`;
    selectMovie(id);
    History.push(path);
  };

  return (
    <Paper>
      <SearchField
        placeholder="Search by title"
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCellWithSorting
                name="place"
                order={order}
                orderBy={orderBy}
                handleClick={handleOrderChange}
              />
              <TableCellWithSorting
                name="title"
                order={order}
                orderBy={orderBy}
                handleClick={handleOrderChange}
              />
              <TableCell>Length (min.)</TableCell>
              <TableCell>Poster</TableCell>
              <TableCell>Vote average</TableCell>
              <TableCell>Vote count</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(
              getOrderedDataByPage(
                filteredMovies,
                orderBy,
                order,
                page,
                rowsPerPage
              ),
              (movie) => {
                const posterUrl = `${baseUrl}original${_.get(
                  movie,
                  'poster_path'
                )}`;
                const id = _.get(movie, 'id');
                return (
                  <TableRow key={id}>
                    <TableCell key={`${id}-place`}>
                      {_.get(movie, 'place')}
                    </TableCell>
                    <TableCell key={`${id}-title`}>
                      {_.get(movie, 'title')}
                    </TableCell>
                    <TableCell key={`${id}-length`}>
                      {_.get(movie, 'runtime')}
                    </TableCell>
                    <TableCell key={`${id}-poster`}>
                      <Link href={posterUrl} target="_blank">
                        Original Size
                      </Link>
                    </TableCell>
                    <TableCell key={`${id}-vote-average`}>
                      {_.get(movie, 'vote_average')}
                    </TableCell>
                    <TableCell key={`${id}-vote-count`}>
                      {_.get(movie, 'vote_count')}
                    </TableCell>
                    <TableCell key={`${id}-detail`}>
                      <ViewButton onClick={() => handleClick(id)} />
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={filteredMovies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={(event, newPage) => setPage(newPage)}
        onChangeRowsPerPage={(event) => {
          setRowsPerPage(event.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
};

const mapStateToProps = ({ movies: { byId, ids, config } }) => ({
  movies: byId,
  ids,
  baseUrl: _.get(config, 'secure_base_url'),
});
const mapDispatchToProps = (dispatch) => ({
  selectMovie: (id) => {
    dispatch(movieState.selectMovie(id));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
