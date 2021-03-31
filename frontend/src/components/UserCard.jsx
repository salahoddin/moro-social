import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

const UserCard = ({
	children,
	user,
	border,
	closeHandler,
	setShowFollowers,
	setShowFollowing,
}) => {
	const closeAllHandler = () => {
		if (closeHandler) closeHandler()
		if (setShowFollowers) setShowFollowers(false)
		if (setShowFollowing) setShowFollowing(false)
	}
	return (
		<div
			className={`d-flex p-2 align-items-center justify-content-between ${border}`}
		>
			<div>
				<Link
					className='d-flex align-items-center'
					to={`/profile/${user._id}`}
					onClick={closeAllHandler}
				>
					<Avatar src={user.avatar} size='big-avatar'>
						avatar
					</Avatar>
					<div className='ml-1' style={{ transform: 'translateY(-2px)' }}>
						<span className='d-block'>{user.username}</span>
						<small style={{ opacity: 0.7 }}>{user.fullname}</small>
					</div>
				</Link>
			</div>
			{children}
		</div>
	)
}

export default UserCard
