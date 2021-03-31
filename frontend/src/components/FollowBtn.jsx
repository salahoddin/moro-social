import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { follow, unFollow } from '../redux/actions/profileAction'

const FollowBtn = ({ user }) => {
	const { auth, profile } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [followed, setFollowed] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		// If the profile you're viewing is already followed by you
		if (auth && auth.user.following.find((item) => item._id === user._id)) {
			setFollowed(true)
		}
	}, [auth.user.following, user._id])

	const unfollowHandler = async () => {
		if (loading) return
		setFollowed(false)

		setLoading(true)
		await dispatch(unFollow({ users: profile.users, user, auth }))
		setLoading(false)
	}
	const followHandler = async () => {
		if (loading) return
		setFollowed(true)

		setLoading(true)
		await dispatch(follow({ users: profile.users, user, auth }))
		setLoading(false)
	}
	return (
		<React.Fragment>
			{followed ? (
				<button className='btn btn-outline-danger' onClick={unfollowHandler}>
					Unfollow
				</button>
			) : (
				<button className='btn btn-outline-info' onClick={followHandler}>
					Follow
				</button>
			)}
		</React.Fragment>
	)
}

export default FollowBtn
