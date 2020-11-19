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
    try {
        dispatch({type: CATEGORY_SAVE_REQUEST, payload: category});
        const {
            userSignin: {userInfo},
        } = getState();
        if (!category._id) {
            const {data} = await Axios.post('/api/category', category, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token,
                },
            });
            dispatch({type: CATEGORY_SAVE_SUCCESS, payload: data});
        } else {
            console.log('uso je u else....');
            // const { data } = await Axios.put(
            //     '/api/products/' + product._id,
            //     product,
            //     {
            //       headers: {
            //         Authorization: 'Bearer ' + userInfo.token,
            //       },
            //     }
            // );
            // dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        }
    } catch (error) {
        dispatch({type: CATEGORY_SAVE_FAIL, payload: error.message});
    }
};

// const detailsCategory = (productId) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
//     const { data } = await axios.get('/api/products/' + productId);
//     dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
//   }
// };

const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try {
        const {
            userSignin: {userInfo},
        } = getState();
        dispatch({type: CATEGORY_DELETE_REQUEST, payload: categoryId});
        const {data} = await axios.delete('/api/category/' + categoryId, {
            headers: {
                Authorization: 'Bearer ' + userInfo.token,
            },
        });
        dispatch({type: CATEGORY_DELETE_SUCCESS, payload: data, success: true});
    } catch (error) {
        dispatch({type: CATEGORY_DELETE_FAIL, payload: error.message});
    }
};

export {
    listCategories,
    saveCategory,
    deleteCategory,
};
