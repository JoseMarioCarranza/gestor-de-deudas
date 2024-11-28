const asyncHandler = require('express-async-handler')
const Transaccion = require('../model/transaccionesModel')
const Empleado = require('../model/empleadoModel')
const mongoose = require('mongoose')

const getTransacciones = asyncHandler(async (req, res) => {
    const transacciones = await Transaccion.find()
    res.status(200).json(transacciones)
})

const crearTransaccion = asyncHandler(async (req, res) => {
    const empleadoId = req.body.empleado

    // Validar el ID como ObjectId
    if (!mongoose.Types.ObjectId.isValid(empleadoId)) {
        res.status(400)
        throw new Error("El ID del empleado no es válido")
    }

    // Buscar el empleado
    const empleadoEncontrado = await Empleado.findById(empleadoId)

    if (!empleadoEncontrado) {
        res.status(404)
        throw new Error("Empleado no encontrado")
    }

    // Crear la transacción
    const transaccion = await Transaccion.create({
        empleado: empleadoEncontrado._id, // Usar el ObjectId del empleado
        tipo: req.body.tipo,
        cantidad: req.body.cantidad
    })

    res.status(201).json({ transaccion })
})

const getTransaccionesEmpleado = asyncHandler(async (req, res) => {

    //const empleadoId = req.body.empleado

    const transacciones = await Transaccion.find({ empleado: req.body.empleado })

    res.status(200).json(transacciones)
})

const modificarTransaccion = asyncHandler(async (req, res) => {

    const transaccion = await Transaccion.findById(req.params.id)

    if (!transaccion) {
        res.status(400)
        throw new Error('La tarea no fué encontrada')
    }

    const transaccionUpdated = await Transaccion.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(transaccionUpdated)
})

const eliminarTransaccion = asyncHandler(async (req, res) => {
    const transaccion = await Transaccion.findById(req.params.id)

    if (!transaccion) {
        res.status(400)
        throw new Error('La tarea no fué encontrada')
    }

    await Transaccion.deleteOne(transaccion)

    res.status(200).json({ id: transaccion.id })
})

module.exports = {
    getTransacciones,
    crearTransaccion,
    modificarTransaccion,
    eliminarTransaccion,
    getTransaccionesEmpleado
}