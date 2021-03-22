const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.get('/search', auth, userController.searchUser)

module.exports = router