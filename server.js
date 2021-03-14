require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDB = require('./backend/config/db')
connectDB()
const app = express()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.get('/', (req, res) => {
	res.json({
		message: 'hello',
	})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
	console.log(`Server is running on PORT ${PORT}`)
})