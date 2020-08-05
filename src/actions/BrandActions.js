import Constants from '../constants/Constants'

import {
    GET_LIST_BRAND,
    CLEAR_BRAND_LIST,
    UPDATE_BRAND_LOADING_STATUS
} from '../constants/BrandType'


/**
 * 
 * @param {*} condition 
 */
export function getListBrandByCondition(condition) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let url = `${Constants.URL.wc}brands`;
                dispatch(updateTheLoadingStatus(true))
                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Basic' + btoa(`${Constants.auth.username}:${Constants.auth.password}`),
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }})
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        resolve();
                        dispatch(getList(data));
                        dispatch(updateTheLoadingStatus(false))
                    })
                    .catch((error) => {
                        console.log("error call data", error)
                        dispatch(getList([]));
                        dispatch(updateTheLoadingStatus(true))
                    });
            }, 500);
        });
    };
}

export function updateTheLoadingStatus(status) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                dispatch({
                    type: UPDATE_BRAND_LOADING_STATUS,
                    payload: status
                });
            }, 100);
        });
    };
}

export function getList(data) {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
                dispatch({
                    type: GET_LIST_BRAND,
                    payload: { collection: data }
                });
            }, 100);
        });
    };
}



