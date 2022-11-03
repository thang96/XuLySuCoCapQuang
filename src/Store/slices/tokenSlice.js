import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  token: null,
  // userId: {
  //   id: 17,
  //   password: '123456',
  //   token: '123123',
  // },
};
export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    updateToken: (state, actions) => {
      state.token = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
  },
});

export const {updateToken} = tokenSlice.actions;

export const token = state => state?.token?.token;

export default tokenSlice.reducer;
