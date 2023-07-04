import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    CLEAR_ERRORS,
} from '../contains/userContains'

export const userLoginReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
                // user: null,
            }
        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS: 
        return {
            loading: false,
            isAuthenticated: false,
            user: null,
            error: null,

        }
        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null,

            }
        case LOAD_USER_FAIL:
            return {

                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload,

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                message: null,
                isAuthenticated: false,
                user: null,
                loading: false,
                
            }
        default:
            return state

    }
}
