const express = require('express')
const router = express.Router()
const { getTransacciones,
    crearTransaccion,
    modificarTransaccion,
    eliminarTransaccion,
    getTransaccionesEmpleado } = require('../controllers/transaccionesControllers')
const { protect, protectAdmin } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTransacciones).post(protectAdmin, crearTransaccion)

router.route('/:id').put(protectAdmin, modificarTransaccion).delete(protectAdmin, eliminarTransaccion)

router.route('/empleado').get(protect, getTransaccionesEmpleado)

module.exports = router