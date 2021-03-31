import React from 'react'
import UserCard from '../UserCard'
import FollowBtn from '../FollowBtn'
import { useSelector } from 'react-redux'

const Followers = ({ users, setShowFollowers }) => {
	const { auth } = useSelector((state) => state)

	return (
		<div className='follow'>
			<div className='follow_box'>
				<h5 className='text-center'>Followers</h5>
				<hr />
				{users.map((user) => (
					// UserCard takes 3 props
					<UserCard
						key={user._id}
						user={user}
						setShowFollowers={setShowFollowers}
					>
						{
							// no follow self
							auth.user._id !== user._id && <FollowBtn user={user}></FollowBtn>
						}
					</UserCard>
				))}

				<div className='close' onClick={() => setShowFollowers(false)}>
					&times;
				</div>
			</div>
		</div>
	)
}

export default Followers
