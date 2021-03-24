import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '../../utils/fetchData'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import UserCard from '../UserCard'
import LoadingIcon from '../../images/loading.gif'

const Search = () => {
	const { auth } = useSelector((state) => state)
	const dispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [users, setUsers] = useState([])
	const [loading, setLoading] = useState(false)

	const closeHandler = () => {
		setSearch('')
		setUsers([])
	}

	const searchHandler = async (e) => {
		e.preventDefault()
		if (!search) return

		try {
			setLoading(true)

			const res = await getDataAPI(`search?username=${search}`, auth.token)
			setUsers(res.data.users)

			setLoading(false)
		} catch (err) {
			dispatch({
				type: GLOBAL_TYPES.ALERT,
				payload: { error: err.response.data.message },
			})
			setLoading(false)
		}
	}
	return (
		<form className='search_form' onSubmit={searchHandler}>
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

			<button type='submit' style={{ display: 'none' }}>
				Search
			</button>
			{loading && (
				<img className='loader' src={LoadingIcon} alt='loading'></img>
			)}

			<div className='users'>
				{search &&
					users.map((user) => (
						<UserCard
							key={user._id}
							user={user}
							border='border'
							closeHandler={closeHandler}
						></UserCard>
					))}
			</div>
		</form>
	)
}

export default Search
