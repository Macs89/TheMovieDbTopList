import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import container from './container';
import Router from './router';
import theme from './theme';

const Store = container.Store;

const App = () => (
  <Provider store={Store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  </Provider>
);

export default App;
