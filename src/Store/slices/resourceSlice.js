import {createAction, createSlice, current} from '@reduxjs/toolkit';
import {uuid} from '../../utilies';
const initialState = {
  resourceStore: [
    {
      type: 'text',
      value: 'Company name : ABC',
      x: 10,
      y: 150,
      width: 180,
      height: 40,
      colorIcon: 'black',
      fontfamily: null,
      fontsize: 16,
      bold: true,
      italic: false,
      id: '1',
      rotate: 0,
    },
    {
      type: 'text',
      value: 'Address : Ha Noi',
      x: 10,
      y: 190,
      width: 180,
      height: 40,
      colorIcon: 'black',
      fontfamily: null,
      fontsize: 16,
      bold: true,
      italic: false,
      id: '2',
      rotate: 0,
    },
  ],
};

export const resourceStoreSlice = createSlice({
  name: 'resourceStore',
  initialState,
  reducers: {
    addResource: (state, actions) => {
      state.resourceStore.push(actions.payload);
      // state.colorStore = [...current(state.colorStore), actions.payload];
    },
    updateResource: (state, actions) => {
      const newResource = [...current(state.resourceStore)];
      newResource[actions.payload.index] = actions.payload.itembox;
      state.resourceStore = newResource;
    },
    removeResource: (state, actions) => {
      const newResource = [...current(state.resourceStore)];
      const indexSelected = newResource.findIndex(
        item => item.id === actions?.payload,
      );
      newResource.splice(indexSelected, 1);
      state.resourceStore = newResource;
    },
  },
});

export const {addResource, updateResource, removeResource} =
  resourceStoreSlice.actions;

export const resourceStore = state => state.resource.resourceStore;

export default resourceStoreSlice.reducer;
