const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authController = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password, gender } = req.body
			let newUsername = username.toLowerCase().replace(/ /g, '')

			// if username is already taken
			const userExist = await User.findOne({ username: newUsername })
			if (userExist)
				return res
					.status(400)
					.json({ message: 'This username is already taken' })

			const emailExist = await User.findOne({ email: email })
			if (emailExist)
				return res.status(400).json({ message: 'This email is already taken' })

			if (password.length < 6)
				return res
					.status(400)
					.json({ message: 'Password must be atleast 6 characters' })

			const passwordHash = await bcrypt.hash(password, 12)

			const newUser = new User({
				fullname: fullname,
				username: newUsername,
				email: email,
				password: passwordHash,
				gender: gender,
			})

			const accessToken = createAccessToken({ id: newUser._id })
			const refreshToken = createRefreshToken({ id: newUser._id })

			res.cookie('refreshtoken', refreshToken, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
			})

			await newUser.save()
			res.json({
				message: 'Registration Successful',
				accessToken: accessToken,
				user: {
					...newUser._doc,
					password: '',
				},
			})
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			})
		}
	},
	login: async (req, res) => {
		try {
			const { email, password } = req.body

			const user = await User.findOne({ email: email }).populate(
				'followers following',
				'-password'
			)
			if (!user)
				return res.status(400).json({ message: 'This email does not exist' })

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch)
				return res
					.status(400)
					.json({ message: 'Invalid username and/or password' })

			const accessToken = createAccessToken({ id: user._id })
			const refreshToken = createRefreshToken({ id: user._id })

			res.cookie('refreshtoken', refreshToken, {
				httpOnly: true,
				path: '/api/refresh_token',
				maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
			})

			res.json({
				message: 'Login Successful',
				accessToken: accessToken,
				user: {
					...user._doc,
					password: '',
				},
			})
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			})
		}
	},
	logout: async (req, res) => {
		try {
			res.clearCookie('refreshtoken', { path: '/api/refresh_token' })
			return res.json({ message: 'Logges out' })
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			})
		}
	},
	generateAccessToken: async (req, res) => {
		try {
			const rfToken = req.cookies.refreshtoken
			if (!rfToken) return res.status(400).json({ message: 'Please log in' })

			jwt.verify(
				rfToken,
				process.env.REFRESH_TOKEN_SECRET,
				async (err, result) => {
					if (err) return res.status(400).json({ message: 'Please log in' })

					const user = await User.findById(result.id)
						.select('-password')
						.populate('followers following', '-password')

					if (!user) return res.status(400).json({ message: 'Invalid token' })

					const accessToken = createAccessToken({ id: result.id })

					res.json({
						accessToken,
						user,
					})
				}
			)
		} catch (err) {
			return res.status(500).json({
				message: err.message,
			})
		}
	},
}

const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '30d',
	})
}
module.exports = authController
