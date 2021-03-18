import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import authReducer from './reducers/authReducer'
import alertReducer from './reducers/alertReducer'
import themeReducer from './reducers/themeReducer'

const reducer = combineReducers({
	auth: authReducer,
	alert: alertReducer,
	theme: themeReducer,
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
