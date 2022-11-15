import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  colorStore: [
    {
      key: 'White',
      value: 'rgb(255,255,255)',
    },
    {
      key: 'Black',
      value: 'rgb(0,0,0)',
    },
    {
      key: 'Red',
      value: 'rgb(255,0,0)',
    },
    {
      key: 'Lime',
      value: 'rgb(0,255,0)',
    },
    {
      key: 'Blue',
      value: 'rgb(0,0,255)',
    },
    {
      key: 'Yellow',
      value: 'rgb(255,255,0)',
    },
    {
      key: 'Aqua',
      value: 'rgb(0,255,255)',
    },
    {
      key: 'Mageta',
      value: 'rgb(255,0,255)',
    },
    {
      key: 'Silver',
      value: 'rgb(192,192,192)',
    },
    {
      key: 'Gray',
      value: 'rgb(128,128,128)',
    },
    {
      key: 'Maroon',
      value: 'rgb(128,0,0)',
    },
    {
      key: 'Olive',
      value: 'rgb(128,128,0)',
    },
    {
      key: 'Green',
      value: 'rgb(0,128,0)',
    },
    {
      key: 'Purple',
      value: 'rgb(128,0,128)',
    },
    {
      key: 'Teal',
      value: 'rgb(0,128,128)',
    },
    {
      key: 'Navy',
      value: 'rgb(0,0,128)',
    },
  ],
};

export const colorStoreSlice = createSlice({
  name: 'colorStore',
  initialState,
  reducers: {
    addNewColor: (state, actions) => {
      state.colorStore.push(actions.payload);
      // state.colorStore = [...current(state.colorStore), actions.payload];
    },
  },
});

export const {addNewColor} = colorStoreSlice.actions;

export const colorStore = state => state.color.colorStore;

export default colorStoreSlice.reducer;
