import { TYPES } from '../actions/authAction'

const authReducer = (state = {}, action) => {
	switch (action.type) {
		case TYPES.AUTH:
			return action.payload
		default:
			return state
	}
}

export default authReducer
