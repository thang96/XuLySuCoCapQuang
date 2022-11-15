import {createAction, createSlice, current} from '@reduxjs/toolkit';
const initialState = {
  frontCard: null,
  shareCard: null,
  backOfCard: null,
  typeCard: null,
  cardRequirements: null,
};
export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addShareCard: (state, actions) => {
      state.shareCard = actions.payload;
      // state.frontCard.push(actions.payload);
    },
    addFrontCard: (state, actions) => {
      state.frontCard = actions.payload;
      // state.frontCard.push(actions.payload);
    },
    addBackOfCard: (state, actions) => {
      state.backOfCard = actions.payload;
      // state.cardStore = [...current(state.cardStore), actions.payload];
    },
    addCardRequirements: (state, actions) => {
      state.cardRequirements = actions.payload;
    },
    addtypeCard: (state, actions) => {
      state.typeCard = actions.payload;
    },
  },
});

export const {
  addFrontCard,
  addBackOfCard,
  addtypeCard,
  addShareCard,
  addCardRequirements,
} = cardSlice.actions;

export default cardSlice.reducer;
