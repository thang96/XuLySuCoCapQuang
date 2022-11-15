import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  userId: [],
  // userId: {
  //   id: 17,
  //   password: '123456',
  //   token: '123123',
  // },
};
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.userId = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
  },
});

export const {updateUser} = userInfoSlice.actions;

export const userInfo = state => state?.userId?.userId;

export default userInfoSlice.reducer;
