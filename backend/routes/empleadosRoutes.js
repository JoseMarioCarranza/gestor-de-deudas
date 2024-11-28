const express = require('express')
const router = express.Router()
const { protect, protectAdmin } = require('../middleware/authMiddleware')

const { registrarEmpleado, obtenerEmpleados } = require('../controllers/empleadosController')

router.post('/', protectAdmin, registrarEmpleado)
router.get('/lista', protect, obtenerEmpleados)

module.exports = router