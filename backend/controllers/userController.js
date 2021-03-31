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
			const user = await User.findById(req.params.id)
				.select('-password')
				.populate('followers following', '-password')
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
	follow: async (req, res) => {
		try {
			const user = await User.find({
				_id: req.params.id,
				followers: req.user._id,
			})
			if (user.length > 0)
				return res
					.status(500)
					.json({ message: 'You are already following this user' })

			// add current logged in user to the followers
			await User.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$push: { followers: req.user._id },
				},
				{
					new: true,
				}
			)

			// add following to the current logged in user
			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: { following: req.params.id },
				},
				{
					new: true,
				}
			)

			res.json({ message: 'You are now following this user' })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
	unFollow: async (req, res) => {
		try {
			await User.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$pull: { followers: req.user._id },
				},
				{
					new: true,
				}
			)

			await User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$pull: { following: req.params.id },
				},
				{
					new: true,
				}
			)

			res.json({ message: 'You have unfollowed this user' })
		} catch (err) {
			return res.status(500).json({ message: err.message })
		}
	},
}

module.exports = userController
