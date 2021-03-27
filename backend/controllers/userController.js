const User = require('../models/userModel')

const userController = {
	searchUser: async (req, res) => {
		try {
			const users = await User.find({
				username: { $regex: req.query.username },
			})
				.limit(10)
				.select('fullname username avatar')
			res.json({ users })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
	getUser: async (req, res) => {
		try {
			const user = await User.findById(req.params.id).select('-password')
			if (!user) return res.status(400).json({ message: 'User not found' })

			res.json({ user })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
	updateUser: async (req, res) => {
		try {
			const {
				avatar,
				fullname,
				mobile,
				address,
				story,
				website,
				gender,
			} = req.body

			if (!fullname)
				return res.status(400).json({ message: 'Please enter your fullname' })

			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					avatar: avatar,
					fullname: fullname,
					mobile: mobile,
					address: address,
					story: story,
					website: website,
					gender: gender,
				}
			)

			res.json({ message: 'Successfully updated' })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
}

module.exports = userController
