import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/useSlice';
import colorSlice from './slices/colorSlice';
import resourceSlice from './slices/resourceSlice';
import tokenSlice from './slices/tokenSlice';
import cardSlice from './slices/cardSlice';
export const store = configureStore({
  reducer: {
    userId: userReducer,
    token: tokenSlice,
    color: colorSlice,
    resource: resourceSlice,
    card: cardSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({immutableCheck: false, serializableCheck: false}),
});
