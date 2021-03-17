import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { register } from '../redux/actions/authAction'

const Register = () => {
	const dispatch = useDispatch()

	const { auth, alert } = useSelector((state) => state)
	const history = useHistory()

	const [userData, setUserData] = useState({
		fullname: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		gender: 'male',
	})
	const {
		fullname,
		username,
		email,
		password,
		confirmPassword,
		gender,
	} = userData

	const [showPass, setShowPass] = useState(false)
	const [showConfirmPass, setConfirmShowPass] = useState(false)

	const onChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()
		dispatch(register(userData))
	}

	useEffect(() => {
		if (auth && auth.token) history.push('/')
	}, [auth, auth.token, history])
	return (
		<div className='login_page'>
			<form onSubmit={onSubmitHandler}>
				<h3 className='text-uppercase text-center mb-4'>Moro Social</h3>
				<div className='form-group'>
					<label htmlFor='fullname'>Fullname</label>
					<input
						type='text'
						className='form-control'
						id='fullname'
						name='fullname'
						value={fullname}
						onChange={onChangeHandler}
						style={{ background: `${alert.fullname ? '#fd2d6a14' : ''}` }}
					/>
					<small className='form-text text-danger'>
						{alert.fullname ? alert.fullname : ''}
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						className='form-control'
						id='username'
						name='username'
						value={username.toLowerCase().replace(/ /g, '')}
						onChange={onChangeHandler}
						style={{ background: `${alert.username ? '#fd2d6a14' : ''}` }}
					/>
					<small className='form-text text-danger'>
						{alert.username ? alert.username : ''}
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='email'
						name='email'
						value={email}
						onChange={onChangeHandler}
						style={{ background: `${alert.email ? '#fd2d6a14' : ''}` }}
					/>
					<small className='form-text text-danger'>
						{alert.email ? alert.email : ''}
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<div className='pass'>
						<input
							type={showPass ? 'text' : 'password'}
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChangeHandler}
							style={{ background: `${alert.password ? '#fd2d6a14' : ''}` }}
						/>
						<small onClick={() => setShowPass(!showPass)}>
							{showPass ? 'Hide' : 'Show'}
						</small>
					</div>
					<small className='form-text text-danger'>
						{alert.password ? alert.password : ''}
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='confirmpassword'>Confirm Password</label>
					<div className='pass'>
						<input
							type={showConfirmPass ? 'text' : 'password'}
							className='form-control'
							id='confirmpassword'
							name='confirmPassword'
							value={confirmPassword}
							onChange={onChangeHandler}
							style={{
								background: `${alert.confirmPassword ? '#fd2d6a14' : ''}`,
							}}
						/>
						<small onClick={() => setConfirmShowPass(!showConfirmPass)}>
							{showConfirmPass ? 'Hide' : 'Show'}
						</small>
					</div>
					<small className='form-text text-danger'>
						{alert.confirmPassword ? alert.confirmPassword : ''}
					</small>
				</div>

				{/* <div className='row justify-content-around mx-0 mb-1'>
					<label htmlFor='male'>
						Male:{' '}
						<input
							type='radio'
							id='male'
							name='gender'
							value='male'
							defaultChecked
							onChange={onChangeHandler}
						></input>
					</label>
					<label htmlFor='female'>
						Female:{' '}
						<input
							type='radio'
							id='female'
							name='gender'
							value='female'
							onChange={onChangeHandler}
						></input>
					</label>
				</div> */}

				<div className='form-check form-check-inline justify-content-center mb-5'>
					<input
						className='form-check-input'
						type='radio'
						name='gender'
						id='male'
						value='male'
						onChange={onChangeHandler}
						defaultChecked
					/>
					<label className='form-check-label' htmlFor='male'>
						Male
					</label>
				</div>
				<div className='form-check form-check-inline'>
					<input
						className='form-check-input'
						type='radio'
						name='gender'
						id='female'
						value='female'
						onChange={onChangeHandler}
					/>
					<label className='form-check-label' htmlFor='female'>
						Female
					</label>
				</div>

				<button type='submit' className='btn btn-dark w-100'>
					Register
				</button>
				<p>
					Already have an account? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	)
}

export default Register
