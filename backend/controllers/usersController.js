const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const registrarUser = asyncHandler(async (req, res) => {

    const { name, userName, password, esAdmin } = req.body

    if (!name || !userName || !password) {
        res.status(400)
        throw new Error("Faltan datos favor de verificar")
    }

    /* This code snippet is checking if a user with the provided userName already exists in the database
    before attempting to create a new user. Here's a breakdown of what it does: */
    const userExiste = await User.findOne({ userName })
    if (userExiste) {
        res.status(400)
        throw new Error("El usuario ya existe en la base de datos, favor de verificar")
    }

    /* The code snippet `const salt = await bcrypt.genSalt(10)` is generating a salt value using bcrypt
    with a cost factor of 10. The salt is a random value used in the hashing process to add
    complexity and uniqueness to the hashed password. */
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        userName,
        password: hashedPassword,
        esAdmin
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            userName: user.userName,
            admin: user.esAdmin
        })
    } else {
        res.status(400)
        throw new Error("No se pudieron guardar los datos")
    }

})

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Usuario logueado con exito' })
})

const misDatos = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Datos del usuario' })
})

module.exports = {
    registrarUser,
    loginUser,
    misDatos
}