const express = require('express')
const router = express.Router()
const { getTransacciones,
    crearTransaccion,
    modificarTransaccion,
    eliminarTransaccion } = require('../controllers/transaccionesControllers')

router.route('/').get(getTransacciones).post(crearTransaccion)

router.route('/:id').put(modificarTransaccion).delete(eliminarTransaccion)

module.exports = router