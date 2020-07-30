import Constants from '../constants/Constants'

import {
    GET_LIST_BRAND,
    CLEAR_BRAND_LIST,
} from '../constants/BrandType'


/**
 * 
 * @param {*} condition 
 */
export function getListBrandByCondition(condition) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const url = `${Constants.URL.wc}brands?page=${condition.page}&per_page=${condition.per_page}&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
                        dispatch({
                            type: GET_LIST_BRAND,
                            payload: { products: data }
                        });
                    })
                    .catch((error) => {
                        console.log("error call data", error)
                        dispatch({
                            type: CLEAR_BRAND_LIST,
                            payload: { brands: [] }
                        });
                    });
            }, 500);
        });
    };
}


