import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions/authAction'

const Login = () => {
	const [userData, setUserData] = useState({ email: '', password: '' })
	const { email, password } = userData

	const [showPass, setShowPass] = useState(false)
	const dispatch = useDispatch()

	const onChangeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}
	const onSubmitHandler = (e) => {
		e.preventDefault()
		dispatch(login(userData))
	}

	return (
		<div className='login_page'>
			<form onSubmit={onSubmitHandler}>
				<h3 className='text-uppercase text-center mb-4'>Moro Social</h3>
				<div className='form-group'>
					<label htmlFor='exampleInputEmail1'>Email address</label>
					<input
						type='email'
						className='form-control'
						id='exampleInputEmail1'
						name='email'
						value={email}
						onChange={onChangeHandler}
					/>
					<small id='emailHelp' className='form-text text-muted'>
						We'll never share your email with anyone else.
					</small>
				</div>
				<div className='form-group'>
					<label htmlFor='exampleInputPassword1'>Password</label>
					<div className='pass'>
						<input
							type={showPass ? 'text' : 'password'}
							className='form-control'
							id='exampleInputPassword1'
							name='password'
							value={password}
							onChange={onChangeHandler}
						/>
						<small onClick={() => setShowPass(!showPass)}>
							{showPass ? 'Hide' : 'Show'}
						</small>
					</div>
				</div>
				<button
					type='submit'
					className='btn btn-dark w-100'
					disabled={email && password ? false : true}
				>
					Login
				</button>
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	)
}
export default Login
