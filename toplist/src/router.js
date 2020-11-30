import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Main from './pages/main';
import container from './container';

const Router = () => {
  return (
    <ConnectedRouter history={container.history}>
      <Main>
        <Switch/>
      </Main>
    </ConnectedRouter>
  );
};

export default Router;
