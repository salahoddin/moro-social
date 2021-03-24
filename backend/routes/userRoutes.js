const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const userController = require('../controllers/userController')

router.get('/search', auth, userController.searchUser)
router.get('/user/:id', auth, userController.getUser)

module.exports = router
