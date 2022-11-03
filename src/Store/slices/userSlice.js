import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  user: [],
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, actions) => {
      state.user = actions.payload;
      // state.user = [...current(state.user), actions.payload];
    },
  },
  extraReducers: {},
});

export const {updateUser} = userSlice.actions;

export const userInfo = state => state?.user?.user;

export default userSlice.reducer;
