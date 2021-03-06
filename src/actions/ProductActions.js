import Constants from '../constants/Constants'

import {
    GET_LIST_PRODUCT,
    GET_LIST_PRODUCT_LOAD_MORE,
    GET_PRODUCT_DETAIL,
    CLEAR_PRODUCT_LIST,
    UPDATE_PRODUCT_SEARCH,
    
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
                let url = null;
                if(condition.search != ''){
                    url = `${Constants.URL.wc}products?page=${condition.page}&per_page=20&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                    console.log(url)
                }
                else{
                    url = `${Constants.URL.wc}products?page=${condition.page}&per_page=20&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                }
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

export function getListProductMoreByCondition(condition) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let url = null;
                if(condition.search != ''){
                    url = `${Constants.URL.wc}products?page=${condition.page}&per_page=20&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                }
                else{
                    url = `${Constants.URL.wc}products?page=${condition.page}&per_page=20&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                }
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
                        dispatch({
                            type: GET_LIST_PRODUCT_LOAD_MORE,
                            payload: { products: data }
                        });
                    })
                    .catch((error) => {
                       console.log(error)
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
export function updateProductPrice(id, price, name) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = `${Constants.URL.wc}products/${id}?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        regular_price: price,
                        name: name
                    })
                })
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: data
                        });
                    })
                    .catch((error) => {
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: {}
                        });
                    });
            }, 500);
        });
    };
}

export function updateProduct(id, form){
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = `${Constants.URL.wc}products/${id}?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form)
                })
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: data
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: {}
                        });
                    });
            }, 500);
        });
    };
}

/**
 * 
 * @param {*} search 
 */
export function updateProductSearch(search) {
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
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
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
                        resolve();
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: data
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                        dispatch({
                            type: GET_PRODUCT_DETAIL,
                            payload: {}
                        });
                    });
            }, 500);
        });
    };
}


