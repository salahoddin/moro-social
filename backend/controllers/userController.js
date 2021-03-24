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
}

module.exports = userController
