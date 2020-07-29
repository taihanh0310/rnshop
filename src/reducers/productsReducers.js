"use strict"

import {
  GET_LIST_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_LIST
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
        products: action.payload.products
      }
    }
    case GET_PRODUCT_DETAIL: {
      return Object.assign({}, state, {
        product: action.payload,
      })
    }
    case CLEAR_PRODUCT_LIST: {
      return {
        ...state,
        products: []
      }
    }
  }
  return state
}