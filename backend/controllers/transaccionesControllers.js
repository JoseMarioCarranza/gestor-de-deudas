const asyncHandler = require('express-async-handler')

const getTransacciones = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Obtener transacciones' })
})

const crearTransaccion = asyncHandler(async (req, res) => {
    if (!req.body.tipo || !req.body.cantidad) {
        res.status(400)
        throw new Error("Por favor teclea una descripción")
    }
    res.status(201).json({ message: 'Se creo transaccion' })
})

const modificarTransaccion = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Se modifico transaccion ${req.params.id}` })
})

const eliminarTransaccion = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Se elimino transacciones ${req.params.id}` })
})

module.exports = {
    getTransacciones,
    crearTransaccion,
    modificarTransaccion,
    eliminarTransaccion
}