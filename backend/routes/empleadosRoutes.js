const express = require('express')
const router = express.Router()

const { registrarEmpleado, obtenerEmpleados } = require('../controllers/empleadosController')

router.post('/', registrarEmpleado)
router.get('/lista', obtenerEmpleados)

module.exports = router