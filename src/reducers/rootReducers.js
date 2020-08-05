"use strict"
import { combineReducers } from 'redux';

import productsReducers from './productsReducers';
import categoriesReducers from './categoriesReducers'
import brandsReducers from './brandsReducers'

//HERE COMBINE THE REDUCERS
const appReducer = combineReducers({
  products: productsReducers,
  categories: categoriesReducers,
  brands: brandsReducers
});

const RootReducers = (state, action) => {
    return appReducer(state, action);
  };

export default RootReducers;
  