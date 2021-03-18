import { GLOBAL_TYPES } from '../actions/globalTypes'

const themeReducer = (state = false, action) => {
	switch (action.type) {
		case GLOBAL_TYPES.THEME:
			return action.payload
		default:
			return state
	}
}

export default themeReducer
