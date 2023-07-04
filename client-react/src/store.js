import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducer'
import { blogReducer } from './reducers/blogReducer'
const reducer = combineReducers({
    user: userLoginReducer,
    blogs:blogReducer,
})
let intialState = {}

const middleware = [thunk]

const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware)),
);
export default store;