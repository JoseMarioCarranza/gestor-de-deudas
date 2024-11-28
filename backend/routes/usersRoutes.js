const express = require('express')
const router = express.Router()
const { registrarUser, loginUser, misDatos } = require('../controllers/usersController')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

router.post('/', protectAdmin, registrarUser)
router.post('/login', loginUser)
router.get('/datos', protect, misDatos)

module.exports = router