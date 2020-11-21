import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CATEGORY_SAVE_REQUEST,
    CATEGORY_SAVE_SUCCESS,
    CATEGORY_SAVE_FAIL,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_REQUEST,
    CATEGORY_REVIEW_SAVE_REQUEST,
    CATEGORY_REVIEW_SAVE_FAIL,
    CATEGORY_REVIEW_SAVE_SUCCESS,
} from '../constants/categoryConstants';
import axios from 'axios';
import Axios from 'axios';

const listCategories = (
    category = '',
    searchKeyword = '',
    sortOrder = ''
) => async (dispatch) => {
    try {
        // debugger
        dispatch({type: CATEGORY_LIST_REQUEST});
        const {data} = await axios.get('/api/category');
        dispatch({type: CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CATEGORY_LIST_FAIL, payload: error.message});
    }
};
const saveCategory = (category) => async (dispatch, getState) => {
    // try {
    dispatch({type: CATEGORY_SAVE_REQUEST, payload: category});
    const {
        userSignin: {userInfo},
    } = getState();
    if (!category._id) {
        Axios.post(`/api/category`, category, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        })
            .then(data => {
                dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data.data})
            })
            .catch(error => {
                dispatch({type: CATEGORY_SAVE_FAIL, payload: error.response.data});
            })
            .finally(() => {
                dispatch(listCategories())
            });
    } else {
        Axios.put(
            `/api/category/${category.selectedCategory}/${category._id || 0}`,
            category,
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            })
            .then(data => {
                dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data.data})
            })
            .catch(error => {
                dispatch({type: CATEGORY_SAVE_FAIL, payload: error.response.data});
            })
            .finally(() => {
                dispatch(listCategories())
            });
    }
};

const deleteCategory = (category) => async (dispatch, getState) => {
    const {
        userSignin: {userInfo},
    } = getState();
    dispatch({type: CATEGORY_DELETE_REQUEST, payload: category.id});
    axios.delete(`/api/category/${category.selectedCategory}/${category.id}`, {
        headers: {
            Authorization: 'Bearer ' + userInfo.token,
        },
    })
        .then((data) => {
            dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data.data})
        })
        .catch(error => dispatch({type: CATEGORY_DELETE_FAIL, payload: error.response.data}))
        .finally(() => {
            dispatch(listCategories())
        });
};

export {
    listCategories,
    saveCategory,
    deleteCategory,
};
