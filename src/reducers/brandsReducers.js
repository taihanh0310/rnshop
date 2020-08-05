import {
    GET_LIST_BRAND,
    CLEAR_BRAND_LIST,
    UPDATE_BRAND_LOADING_STATUS
} from '../constants/BrandType'

const INITIAL_STATE = {
    search: "",
    isLoading: true,
    collection: [],
    brand: {},
    form: {}
  };
  
  export default function brandsReducers(state = INITIAL_STATE, action) {
    switch (action.type) {
      case GET_LIST_BRAND: {
        return {
          ...state,
          collection: action.payload.collection
        }
      }
      case CLEAR_BRAND_LIST: {
        return {
          ...state,
          collection: []
        }
      }
      case UPDATE_BRAND_LOADING_STATUS: {
          return {
              ...state,
              isLoading: action.payload
          }
      }
    }
    return state
  }