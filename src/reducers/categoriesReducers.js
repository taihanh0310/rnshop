"use strict"

import {
    GET_LIST_CATEGORY,
    CLEAR_CATEGORY_LIST,
    UPDATE_CATEGORY_LOADING_STATUS
} from '../constants/CategoryType'

const INITIAL_STATE = {
  search: "",
  isLoading: true,
  collection: [],
  category: {},
  form: {}
};

export default function categoriesReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LIST_CATEGORY: {
      return {
        ...state,
        collection: [...state.collection, ...action.payload.collection]
      }
    }
    case CLEAR_CATEGORY_LIST: {
      return {
        ...state,
        collection: []
      }
    }
    case UPDATE_CATEGORY_LOADING_STATUS: {
        return {
            ...state,
            isLoading: action.payload
        }
    }
  }
  return state
}