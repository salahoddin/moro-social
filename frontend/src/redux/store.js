import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import notifyReducer from './reducers/notifyReducer'

const reducer = combineReducers({
	auth: authReducer,
	notify: notifyReducer,
})

// const userInfoFromStorage = localStorage.getItem('userInfo')
// 	? JSON.parse(localStorage.getItem('userInfo'))
// 	: null

// const initialState = {
// 	userLogin: { userInfo: userInfoFromStorage },
// }

const middleware = [thunk]

const store = createStore(
	reducer,
	//initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
