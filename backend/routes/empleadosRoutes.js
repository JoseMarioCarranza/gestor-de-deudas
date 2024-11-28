const express = require('express')
const router = express.Router()
const { protect, protectAdmin } = require('../middleware/authMiddleware')

const { registrarEmpleado, obtenerEmpleados, eliminarEmpleado } = require('../controllers/empleadosController')

router.post('/', protectAdmin, registrarEmpleado)
router.get('/lista', protect, obtenerEmpleados)
router.delete('/:id', protectAdmin, eliminarEmpleado)

module.exports = router