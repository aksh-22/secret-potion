import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const networkSlice = createSlice({
  name: 'network',
  initialState: {
    isNetConnected: true,
  },
  reducers: {
    isNetworkConnected(state, action: PayloadAction<boolean>) {
      state.isNetConnected = action.payload;
    },
  },
});

export const {isNetworkConnected} = networkSlice.actions;
export default networkSlice.reducer;
