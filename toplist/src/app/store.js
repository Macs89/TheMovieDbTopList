import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../example/features/counter/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
