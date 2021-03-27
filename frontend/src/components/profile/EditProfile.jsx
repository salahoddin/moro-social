import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { checkImage } from '../../utils/imageUpload'
import { GLOBAL_TYPES } from '../../redux/actions/globalTypes'
import { updateProfile } from '../../redux/actions/profileAction'

const EditProfile = ({ setOnEdit }) => {
	const { auth, theme } = useSelector((state) => state)
	const dispatch = useDispatch()

	const initState = {
		fullname: '',
		mobile: '',
		address: '',
		website: '',
		story: '',
		gender: '',
	}

	const [userData, setUserData] = useState(initState)
	const { fullname, mobile, address, website, story, gender } = userData
	const [avatar, setAvatar] = useState('')

	useEffect(() => {
		setUserData(auth.user)
	}, [auth.user])

	const changeAvatarHandler = (e) => {
		const file = e.target.files[0]
		const err = checkImage(file)

		if (err)
			return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err } })

		setAvatar(file)
	}

	const onChangeHandler = (e) => {
		e.preventDefault()
		setUserData({ ...userData, [e.target.name]: e.target.value })
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()

		dispatch(updateProfile({ userData, avatar, auth }))
	}
	return (
		<div className='edit_profile'>
			{/* <button
				className='btn btn-danger btn_close'
				onClick={() => setOnEdit(false)}
			>
				Close
			</button> */}
			<form onSubmit={onSubmitHandler}>
				<div className='info_avatar'>
					<img
						src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
						alt='avatar'
						style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
					/>
					<span>
						<i className='fas fa-camera'></i>
						<p>Change</p>
						<input
							type='file'
							name='file'
							id='file_up'
							accept='image/*'
							onChange={changeAvatarHandler}
						/>
					</span>
				</div>

				<div className='form-group'>
					<label htmlFor='fullname'>Fullname</label>
					<div className='position-relative'>
						<input
							type='text'
							className='form-control'
							id='fullname'
							name='fullname'
							value={fullname}
							onChange={onChangeHandler}
						/>
						<small
							className='text-danger position-absolute'
							style={{
								top: '50%',
								right: '5px',
								transform: 'translateY(-50%)',
							}}
						>
							{fullname.length}/25
						</small>
					</div>
				</div>
				<div className='form-group'>
					<label htmlFor='mobile'>Mobile</label>
					<input
						type='text'
						className='form-control'
						id='mobile'
						name='mobile'
						value={mobile}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='address'>Address</label>
					<input
						type='text'
						className='form-control'
						id='address'
						name='address'
						value={address}
						onChange={onChangeHandler}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='website'>Website</label>
					<input
						type='text'
						className='form-control'
						id='website'
						name='website'
						value={website}
						onChange={onChangeHandler}
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='story'>Bio</label>
					<textarea
						cols='30'
						rows='4'
						className='form-control'
						id='story'
						name='story'
						value={story}
						onChange={onChangeHandler}
					/>
					<small className='text-danger d-block text-right'>
						{story.length}/200
					</small>
				</div>
				<label htmlFor='gender'>Gender</label>
				<div className='input-group-prepend px-0 mb-4'>
					<select
						name='gender'
						id='gender'
						className='custom-select text-capitalize'
						value={gender}
						onChange={onChangeHandler}
					>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</div>
				<button
					className='btn btn-danger w-100'
					type='button'
					onClick={() => setOnEdit(false)}
				>
					Cancel
				</button>
				<button
					className='btn btn-info w-100'
					type='submit'
					style={{ marginTop: '3px' }}
				>
					Save
				</button>
			</form>
		</div>
	)
}

export default EditProfile
