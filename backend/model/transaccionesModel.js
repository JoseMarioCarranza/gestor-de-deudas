const mongoose = require('mongoose')

const transaccionSchema = mongoose.Schema({
    empleado: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Empleado'
    },
    tipo: {
        type: String,
        require: [true, "Por favor teclea una descripción de la tarea"]
    },
    cantidad: {
        type: Number,
        require: [true, "Por favor teclea una descripción de la tarea"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Transaccion', transaccionSchema)