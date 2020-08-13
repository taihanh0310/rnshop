"use strict"

import {
  GET_LIST_PRODUCT,
  GET_LIST_PRODUCT_LOAD_MORE,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_LIST,
  UPDATE_PRODUCT_SEARCH
} from '../constants/ProductType'

const INITIAL_STATE = {
  search: "",
  isFetching: false,
  products: [],
  product: {}
};

export default function productsReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_LIST_PRODUCT: {
      return {
        ...state,
        products: [...state.products, ...action.payload.products]
      }
    }
    case GET_LIST_PRODUCT_LOAD_MORE: {
      console.log("array", [...state.products, ...action.payload.products])
      return {
        ...state,
        products: [...state.products, ...action.payload.products]
      } 
    }
    case GET_PRODUCT_DETAIL: {
      return {
        ...state,
        product: action.payload
      }
    }
    case CLEAR_PRODUCT_LIST: {
      return {
        ...state,
        products: []
      }
    }
    case UPDATE_PRODUCT_SEARCH: {
      return {
        ...state,
        search: action.payload
      }
    }
  }
  return state
}