"use strict"
import { combineReducers } from 'redux';

//HERE COMBINE THE REDUCERS
const appReducer = combineReducers({
  products: {},
  categories: {},
  brands: {}
});

const RootReducers = (state, action) => {
    return appReducer(state, action);
  };

export default RootReducers;
  