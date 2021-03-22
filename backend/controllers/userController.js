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
}

module.exports = userController
