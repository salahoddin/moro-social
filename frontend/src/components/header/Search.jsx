import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'

const Search = () => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [users, setUsers] = useState([])

	useEffect(() => {
		if (search) {
			getDataAPI(`search?username=${search}`, auth.token)
				.then((res) => setUsers(res.data.users))
				.catch((err) => {
					dispatch({
						type: GLOBAL_TYPES.ALERT,
						payload: { error: err.response.data.message },
					})
				})
		} else {
			setUsers([])
		}
	}, [search, auth.token, dispatch])

	const closeHandler = () => {
		setSearch('')
		setUsers([])
	}
	return (
		<form className='search_form'>
			<input
				type='text'
				name='search'
				value={search}
				id='search'
				onChange={(e) =>
					setSearch(e.target.value.toLowerCase().replace('/ /g', ''))
				}
			/>
			<div className='search_icon' style={{ opacity: search ? 0 : 0.3 }}>
				<span className='material-icons'>search</span>
				<span>Search</span>
			</div>
			<div
				className='close_search'
				style={{ opacity: users.length === 0 ? 0 : 1 }}
				onClick={closeHandler}
			>
				&times;
			</div>

			<div className='users'>
				{search &&
					users.map((user) => (
						<Link
							user={user}
							key={user._id}
							to={`/profile/${user._id}`}
							onClick={closeHandler}
						>
							<UserCard user={user} border='border'></UserCard>
						</Link>
					))}
			</div>
		</form>
	)
}

export default Search
