import { TYPES } from '../actions/notifyAction'

const notifyReducer = (state = {}, action) => {
	switch (action.type) {
		case TYPES.NOTIFY: {
			return action.payload
		}
		default:
			return state
	}
}

export default notifyReducer
