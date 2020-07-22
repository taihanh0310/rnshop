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

export async function getListProductByCondition(condition) {
    const url = `${Constants.URL.wc}products?per_page=100&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
    try {
        let response = await fetch(url);
        let data = await response.json();
        return fetchListProduct(data);
    } catch (error) {
        console.error(error);
        return clearListProduct();
    }
}

