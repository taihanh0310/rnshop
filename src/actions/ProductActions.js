import Constants from '../constants/Constants'

import {
    GET_LIST_PRODUCT,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_LIST,
    UPDATE_PRODUCT_SEARCH
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
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = `${Constants.URL.wc}products?page=${condition.page}&per_page=20&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
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
            }, 500);
        });
    };
}

/**
 * 
 * @param {*} id 
 * @param {*} price 
 */
export function updateProductPrice(id, price) {
    return function (dispatch) {
        const url = `${Constants.URL.wc}products/${id}?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ regular_price: price })
        })
            .then((response) => response.json())
            .then((data) => {
                selectProductDetail(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
}

/**
 * 
 * @param {*} search 
 */
export function updateProductSearch(search){
    return function (dispatch) {
        dispatch({
            type: UPDATE_PRODUCT_SEARCH,
            payload: search
        });
    }
}

/**
 * 
 * @param {*} productForm 
 */
export function createProduct(productForm) {
    return function (dispatch) {
        const url = `${Constants.URL.wc}products?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productForm)
        })
            .then((response) => response.json())
            .then((data) => {
                selectProductDetail(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
}


