import {
    GET_ALL_BLOG_REQUEST,
    GET_ALL_BLOG_SUCCESS,
    GET_ALL_BLOG_FAIL,
    CREATE_BLOG_REQUEST,
    CREATE_BLOG_SUCCESS,
    CREATE_BLOG_FAIL,
    GET_BLOG_DETAILS_REQUEST,
    GET_BLOG_DETAILS_SUCCESS,
    GET_BLOG_DETAILS_FAIL,
    CLEAR_ERRORS,

} from '../contains/blogContains';
import axios from 'axios';
axios.defaults.withCredentials = true;
export const createPost = (Data) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BLOG_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, withCredentials: 'include',
        };
        const api = import.meta.env.VITE_APP_API_URL;
        const { data } = await axios.post(api + '/post/create',
            Data,
            config
        );

        dispatch({ type: CREATE_BLOG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getAllPosts = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_BLOG_REQUEST });

        const { data } = await axios.get(import.meta.env.VITE_APP_API_URL + '/post/all');

        dispatch({ type: GET_ALL_BLOG_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ALL_BLOG_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const getPostDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_BLOG_DETAILS_REQUEST });

        const { data } = await axios.get(import.meta.env.VITE_APP_API_URL + '/post/' + id);

        dispatch({ type: GET_BLOG_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_BLOG_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
