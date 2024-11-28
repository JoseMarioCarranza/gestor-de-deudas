const asyncHandler = require('express-async-handler')
const Empleado = require('../model/empleadoModel')

const registrarEmpleado = asyncHandler(async (req, res) => {
    const { name, lastName } = req.body;

    // Validar los datos de entrada
    if (!name || !lastName) {
        res.status(400).json({ message: "Faltan datos, favor de verificar" });
        return;
    }

    // Verificar si el empleado ya existe
    const empleadoExiste = await Empleado.findOne({ name, lastName });
    if (empleadoExiste) {
        res.status(400).json({ message: "El empleado ya existe" });
        return;
    }

    // Crear el empleado en la base de datos
    try {
        const empleado = await Empleado.create({ name, lastName });

        // Enviar respuesta de éxito
        res.status(201).json({
            _id: empleado._id,
            name: empleado.name,
            lastName: empleado.lastName,
        });
    } catch (error) {
        res.status(500).json({
            message: "No se pudieron guardar los datos, error interno",
            error: error.message,
        });
    }
});

const eliminarEmpleado = asyncHandler(async (req, res) => {
    const empleado = await Empleado.findById(req.params.id)

    if (!empleado) {
        res.status(400)
        throw new Error('El empleado no fue encontrado')
    }

    await Empleado.deleteOne(empleado)

    res.status(200).json({ id: empleado.id })
})

const obtenerEmpleados = asyncHandler(async (req, res) => {
    const empleados = await Empleado.find()
    res.status(200).json(empleados)
})

module.exports = {
    registrarEmpleado,
    obtenerEmpleados,
    eliminarEmpleado
}