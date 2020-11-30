import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import container from '../container';

const movieState = container.movieState;

const Main = ({
  children,
  getMovies,
  getDatabaseBasicUrlInfo,
  baseUrl,
  messages,
}) => {
  useEffect(() => {
    getDatabaseBasicUrlInfo();
    if (baseUrl) {
      getMovies();
    }
  }, [baseUrl]);
  return (
    <Container maxWidth="lg">
      <main>
        <Box>{messages.error ? messages.message : children}</Box>
      </main>
    </Container>
  );
};

const mapStateToProps = ({ movies: { byId, ids, config }, messages }) => ({
  movies: byId,
  ids,
  baseUrl: _.get(config, 'secure_base_url'),
  messages,
});

const mapDispatchToProps = (dispatch) => ({
  getMovies: () => {
    dispatch(movieState.getMovies());
  },
  getDatabaseBasicUrlInfo: () => {
    dispatch(movieState.getDatabaseBasicUrlInfo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
