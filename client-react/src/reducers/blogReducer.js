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

export const blogReducer = (state = { blogs: [] }, action) => {
    switch (action.type) {
        case GET_ALL_BLOG_REQUEST:
        case CREATE_BLOG_REQUEST:
        case GET_BLOG_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case GET_ALL_BLOG_SUCCESS:
        case CREATE_BLOG_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                message: action.payload.message
            }
        case GET_BLOG_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                post: action.payload

            }
        case GET_BLOG_DETAILS_FAIL:
        case GET_ALL_BLOG_FAIL:
        case CREATE_BLOG_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                post:null,
                posts:null,
                message:null
            }
        default:
            return state;
    }
}