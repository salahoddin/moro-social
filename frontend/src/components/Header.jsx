import React, { useState, useReducer, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/authAction'
import { GLOBAL_TYPES } from '../redux/actions/globalTypes'
import Avatar from './Avatar'

const Header = () => {
	const { auth, theme } = useSelector((state) => state)
	const dispatch = useDispatch()
	const { pathname } = useLocation()

	const isActive = (pn) => {
		if (pn === pathname) return 'active'
	}

	const navLinks = [
		{ label: 'Home', icon: 'home', path: '/' },
		{ label: 'Messages', icon: 'chat_bubble', path: '/messages' },
		{ label: 'Discover', icon: 'explore', path: '/discover' },
		{
			label: 'Notifications',
			icon: 'circle_notifications',
			path: '/notifications',
		},
	]

	const logoutHandler = () => {
		dispatch(logout())
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle'>
			<Link to='/'>
				<h1 className='navbar-brand text-uppercase p-0 m-0'>Moro Social</h1>
			</Link>

			<div className='menu'>
				<ul className='navbar-nav flex-row'>
					{navLinks.map((link, index) => (
						<li className={`nav-item px-2 ${isActive(link.path)}`} key={index}>
							<Link className='nav-link' to={link.path}>
								<span className='material-icons'>{link.icon}</span>
							</Link>
						</li>
					))}

					<li className='nav-item dropdown'>
						<span
							className='nav-link dropdown-toggle'
							id='navbarDropdown'
							role='button'
							data-toggle='dropdown'
							aria-haspopup='true'
							aria-expanded='false'
						>
							<Avatar src={auth && auth.user.avatar}></Avatar>
						</span>
						<div className='dropdown-menu' aria-labelledby='navbarDropdown'>
							<Link
								className='dropdown-item'
								to={`/profile/${auth && auth.user._id}`}
							>
								Profile
							</Link>
							<label
								className='dropdown-item'
								htmlFor='theme'
								onClick={() =>
									dispatch({ type: GLOBAL_TYPES.THEME, payload: !theme })
								}
							>
								{theme ? 'Light mode' : 'Dark mode'}
							</label>
							<div className='dropdown-divider'></div>
							<Link onClick={logoutHandler} className='dropdown-item' to='/'>
								Logout
							</Link>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
