const getTransacciones = (req, res) => {
    res.status(200).json({ message: 'Obtener transacciones' })
}

const crearTransaccion = (req, res) => {
    res.status(201).json({ message: 'Se creo transaccion' })
}

const modificarTransaccion = (req, res) => {
    res.status(200).json({ message: `Se modifico transaccion ${req.params.id}` })
}

const eliminarTransaccion = (req, res) => {
    res.status(200).json({ message: `Se elimino transacciones ${req.params.id}` })
}

module.exports = {
    getTransacciones,
    crearTransaccion,
    modificarTransaccion,
    eliminarTransaccion
}