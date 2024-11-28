const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');

// Middleware para proteger rutas
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Verifica si el encabezado de autorización está presente y contiene el token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401).json({ message: 'Usuario no encontrado' });
                return;
            }

            next();
        } catch (error) {
            console.error('Error en la verificación del token:', error.message);

            res.status(401).json({ message: 'Acceso no autorizado, token inválido' });
        }
    } else {
        res.status(401).json({ message: 'Acceso no autorizado, token no proporcionado' });
    }
});

// Middleware para proteger rutas específicas para administradores
const protectAdmin = asyncHandler(async (req, res, next) => {
    // Reutiliza el middleware protect para validar el token y obtener al usuario
    await protect(req, res, async () => {
        // Verifica si el usuario tiene privilegios de administrador
        if (req.user && req.user.esAdmin) {
            next();
        } else {
            res.status(403).json({ message: 'Acceso denegado, no es administrador' });
        }
    });
});

module.exports = { protect, protectAdmin };
