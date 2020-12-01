import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Main from './pages/main';
import MovieList from './pages/MovieList';
import MoviePage from './pages/MoviePage';
import container from './container';

const Router = () => {
  return (
    <ConnectedRouter history={container.history}>
      <Main>
        <Switch>
          <Route
            exact
            path="/movies/"
            render={(props) => <MovieList {...props} />}
          />
          <Route
            path="/movies/:movieId"
            render={(props) => <MoviePage {...props} />}
          />
        </Switch>
      </Main>
    </ConnectedRouter>
  );
};

export default Router;
