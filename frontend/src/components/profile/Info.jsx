import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProfileUsers } from '../../redux/actions/profileAction'
import Avatar from '../Avatar'
import EditProfile from './EditProfile'
import FollowBtn from '../FollowBtn'
import Followers from './Followers'
import Following from './Following'

const Info = () => {
	const { id } = useParams()
	const { auth, profile } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [userData, setUserData] = useState([])
	const [onEdit, setOnEdit] = useState(false)
	const [showFollowers, setShowFollowers] = useState(false)
	const [showFollowing, setShowFollowing] = useState(false)

	useEffect(() => {
		if (auth && auth.user._id === id) {
			setUserData([auth.user])
		} else {
			dispatch(getProfileUsers({ users: profile.users, id, auth }))

			//searched data
			const newData = profile.users.filter((user) => user._id === id)
			setUserData(newData)
		}
	}, [id, auth, dispatch, profile.users])
	return (
		<div className='info'>
			{userData.map((user) => (
				<div className='info_container' key={user._id}>
					<Avatar src={user.avatar} size='xl-avatar'></Avatar>
					<div className='info_content'>
						<div className='info_content_title'>
							<h2>{user.username}</h2>
							{user._id === auth.user._id ? (
								<button
									className='btn btn-outline-info'
									onClick={() => setOnEdit(true)}
								>
									Edit Profile
								</button>
							) : (
								<FollowBtn user={user}></FollowBtn>
							)}
						</div>
						<div className='follow_btn'>
							<span onClick={() => setShowFollowers(true)} className='mr-4'>
								{user.followers.length} followers
							</span>
							<span onClick={() => setShowFollowing(true)} className='ml-4'>
								{user.following.length} following
							</span>
						</div>
						<h6>
							{user.fullname} {user.mobile}
						</h6>
						<p className='m-0'>{user.address}</p>
						<h6 className='m-0'>{user.email}</h6>
						<a href={user.website} target='_blank' rel='noreferrer'>
							{user.website}
						</a>
						<p>{user.story}</p>
					</div>

					{onEdit && <EditProfile setOnEdit={setOnEdit}></EditProfile>}
					{showFollowers && (
						<Followers
							users={user.followers}
							setShowFollowers={setShowFollowers}
						></Followers>
					)}
					{showFollowing && (
						<Following
							users={user.following}
							setShowFollowing={setShowFollowing}
						></Following>
					)}
				</div>
			))}
		</div>
	)
}

export default Info
