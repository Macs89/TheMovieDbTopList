import { configureStore } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import container from '../container';

function Store(history) {
  const store = configureStore({
    reducer: {
      router: connectRouter(history),
      movies: container.movieState.store,
      messages: container.messageState.store,
    },
    devTools: true,
  });
  return store;
}

Store.$inject = ['history'];
Store.$name = 'Store';
Store.$type = 'service';
export default Store;
