const mongoose = require('mongoose')
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateText: true,
			useFindAndModify: true,
			useCreateIndex: true,
		})
		console.log(`MONGO DB CONNECTED ${conn.connection.host}`)
	} catch (error) {
		console.error(`ERROR: ${error.message}`)
		process.exit(1)
	}
}

module.exports = connectDB
