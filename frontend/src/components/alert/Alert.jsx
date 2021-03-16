import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import Loader from './Loader'
import Toast from './Toast'

const Alert = () => {
	const state = useSelector((state) => state)
	const { alert } = state
	const dispatch = useDispatch()
	return (
		<div>
			{alert.loading && <Loader></Loader>}
			{alert.error && (
				<Toast
					message={{ title: 'Error', body: alert.error }}
					handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
					bgColor='bg-danger'
				></Toast>
			)}
			{alert.success && (
				<Toast
					message={{ title: 'Success', body: alert.success }}
					handleShow={() => dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} })}
					bgColor='bg-success'
				></Toast>
			)}
		</div>
	)
}

export default Alert
