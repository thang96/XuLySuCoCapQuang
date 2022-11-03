import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import colorSlice from './slices/colorSlice';
import resourceSlice from './slices/resourceSlice';
import tokenSlice from './slices/tokenSlice';
import userInfoSlice from './slices/userInfoSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    userInfor: userInfoSlice,
    token: tokenSlice,
    color: colorSlice,
    resource: resourceSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
