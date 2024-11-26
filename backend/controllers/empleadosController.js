const registrarEmpleado = (req, res) => {
    res.status(201).json({ message: 'Empleado creado con exito' })
}

const obtenerEmpleados = (req, res) => {
    res.status(200).json({ message: 'Lista de empleados' })
}

module.exports = {
    registrarEmpleado,
    obtenerEmpleados
}