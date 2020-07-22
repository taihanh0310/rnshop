"use strict"
import { combineReducers } from 'redux';

import productsReducers from './productsReducers';

//HERE COMBINE THE REDUCERS
const appReducer = combineReducers({
  products: productsReducers,
});

const RootReducers = (state, action) => {
    return appReducer(state, action);
  };

export default RootReducers;
  