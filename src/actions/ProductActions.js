import Constants from '../constants/Constants'

import {
    GET_LIST_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_LIST
} from '../constants/ProductType'



export function selectProductDetail(productDetail) {
    return function (dispatch) {
        dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: productDetail
        });
    }
}

export function fetchListProduct(data) {
    return function (dispatch) {
        dispatch({
            type: GET_LIST_PRODUCT,
            payload: { products: data }
        });
    }
}

export function clearListProduct() {
    return function (dispatch) {
        dispatch({
            type: CLEAR_PRODUCT_LIST,
            payload: { products: [] }
        });
    }
}

export function getListProductByCondition(condition) {
    return function (dispatch) {
        const url = `${Constants.URL.wc}products?page=${condition.page}&per_page=4&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            dispatch({
                type: GET_LIST_PRODUCT,
                payload: { products: data }
            });
        })
        .catch((error) => {
            dispatch({
                type: CLEAR_PRODUCT_LIST,
                payload: { products: [] }
            });
        });
    }
}


