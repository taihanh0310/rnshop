"use strict"
import { combineReducers } from 'redux';

//HERE COMBINE THE REDUCERS
const appReducer = combineReducers({
});

const RootReducers = (state, action) => {
    return appReducer(state, action);
  };

export default RootReducers;
  