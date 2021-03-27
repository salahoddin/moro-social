import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { getDataAPI, patchDataAPI } from '../../utils/fetchData'
import { imageUpload } from '../../utils/imageUpload'

export const PROFILE_TYPES = {
	LOADING: 'LOADING',
	GET_USER: 'GET_USER',
}

export const getProfileUsers = ({ users, id, auth }) => async (dispatch) => {
	if (users.every((user) => user._id !== id)) {
		try {
			dispatch({ type: PROFILE_TYPES.LOADING, payload: true })

			const res = await getDataAPI(`/user/${id}`, auth.token)

			dispatch({ type: PROFILE_TYPES.GET_USER, payload: res.data })

			dispatch({ type: PROFILE_TYPES.LOADING, payload: false })
		} catch (err) {
			dispatch({ type: PROFILE_TYPES.LOADING, payload: false })

			dispatch({
				type: GLOBAL_TYPES.ALERT,
				payload: { error: err.response.data.message },
			})
		}
	}
}

export const updateProfile = ({ userData, avatar, auth }) => async (
	dispatch
) => {
	if (!userData.fullname)
		return dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: 'Please enter your fullname' },
		})

	if (userData.fullname.length > 25)
		return dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: 'Fullname is too long' },
		})

	if (userData.story.length > 200)
		return dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: 'Bio is too long' },
		})

	try {
		let media

		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } })

		if (avatar) media = await imageUpload([avatar])

		const res = await patchDataAPI(
			'user',
			{
				...userData,
				avatar: avatar ? media[0].url : auth.user.avatar,
			},
			auth.token
		)

		dispatch({
			type: GLOBAL_TYPES.AUTH,
			payload: {
				...auth,
				user: {
					...auth.user,
					...userData,
					avatar: avatar ? media[0].url : auth.user.avatar,
				},
			},
		})

		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { success: res.data.message },
		})
		// dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })
	} catch (err) {
		dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } })

		dispatch({
			type: GLOBAL_TYPES.ALERT,
			payload: { error: err.response.data.message },
		})
	}
}
