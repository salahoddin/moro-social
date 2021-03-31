const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		fullname: {
			type: String,
			required: true,
			trim: true,
			maxLength: 30,
		},
		username: {
			type: String,
			required: true,
			trim: true,
			maxLength: 30,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},

		password: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			default: 'user',
		},
		gender: {
			type: String,
			default: 'male',
		},
		mobile: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		story: {
			type: String,
			default: '',
			maxLength: 200,
		},

		website: {
			type: String,
			default: '',
		},
		followers: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
		following: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
	},
	{ timestamps: true }
)

userSchema.pre('save', function (next) {
	if (this.gender === 'male') {
		this.avatar =
			'https://res.cloudinary.com/dhenabod/image/upload/v1616901921/moro-social/mdefault_fpmb0u.jpg'
	} else {
		this.avatar =
			'https://res.cloudinary.com/dhenabod/image/upload/v1616901870/moro-social/fdefault_i3fevd.jpg'
	}

	next()
})

const User = mongoose.model('user', userSchema)

module.exports = User
