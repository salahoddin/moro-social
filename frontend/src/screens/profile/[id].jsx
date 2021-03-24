import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Info from '../../components/profile/Info'
import Posts from '../../components/profile/Posts'
import LoadingIcon from '../../images/loading.gif'

const Profile = () => {
	const { profile } = useSelector((state) => state)

	return (
		<div className='profile'>
			{profile && profile.loading ? (
				<img src={LoadingIcon} alt='loading' />
			) : (
				<Info></Info>
			)}

			<Posts></Posts>
		</div>
	)
}

export default Profile
