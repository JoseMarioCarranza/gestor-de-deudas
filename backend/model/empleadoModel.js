const mongoose = require('mongoose')

const empleadoSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    },
    lastName: {
        type: String,
        required: [true, 'Por favor teclea tu nombre']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Empleado', empleadoSchema)