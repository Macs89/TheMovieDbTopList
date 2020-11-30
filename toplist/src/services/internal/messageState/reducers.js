import { createSlice } from '@reduxjs/toolkit';

const messageSlicer = createSlice({
  name: 'messages',
  initialState: {
    error: false,
    message: '',
  },
  reducers: {
    receiveError: (state, action) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    receiveMessage: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
    resetErrors: (state) => ({
      ...state,
      error: false,
      message: '',
    }),
  },
});

export const actions = messageSlicer.actions;
export default messageSlicer.reducer;
