import Constants from '../constants/Constants'

import {
    GET_LIST_CATEGORY,
    CLEAR_CATEGORY_LIST,
    UPDATE_CATEGORY_LOADING_STATUS
} from '../constants/CategoryType'


/**
 * 
 * @param {*} condition 
 */
export function getListCategoriesByCondition(condition) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(updateCategoryStatus(true))
            setTimeout(() => {
                let url = null;
                if(condition.search != '' || condition.search != undefined){
                    url = `${Constants.URL.wc}products/categories?page=${condition.page}&per_page=${condition.per_page}&search=${condition.search}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                }
                else{
                    url = `${Constants.URL.wc}products/categories?page=${condition.page}&per_page=${condition.per_page}&consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
                }
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        resolve();
                        dispatch({
                            type: GET_LIST_CATEGORY,
                            payload: { collection: data }
                        });
                        dispatch(updateCategoryStatus(false))
                    })
                    .catch((error) => {
                        console.log("error call data", error)
                        dispatch({
                            type: CLEAR_CATEGORY_LIST,
                            payload: { collection: [] }
                        });
                        dispatch(updateCategoryStatus(false))
                    });
            }, 500);
        });
    };
}

export function updateCategoryStatus(status) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                dispatch({
                    type: UPDATE_CATEGORY_LOADING_STATUS,
                    payload: status
                });
            }, 100);
        });
    };
}
