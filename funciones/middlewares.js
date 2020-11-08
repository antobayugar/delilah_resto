const { Productos, Usuarios } = require('../database/models');
const { Sequelize, DataTypes, Op } = require('../database/db');
const { jwt, firma } = require('../token');


function usersOk(req, res, next) {
    console.log("only users");
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenVerify = jwt.verify(token, firma);

        if (tokenVerify) {
            req.user = tokenVerify;
            return next();
        } else {
            res.status(401).send('Hubo un error al validar al usuario');
        }
    } catch (err) {
        res.status(400).send('No se encontró usuario registrado.');
    }
}

function adminOk(req, res, next) {
    console.log("only admin");
    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenVerify = jwt.verify(token, firma);
        if (tokenVerify) {
            console.log(tokenVerify.datosUsuario.admin);
            if (tokenVerify.datosUsuario.admin == 1) {
                return next()
            } else {
                res.status(401).send('No puede realizar la acción, sólo puede realizarla usuario con rol administrador')
            } 
        }
    } catch (err) {
        res.status(400).send('No se encontró usuario Administrador registrado.');
    }
}


module.exports = {
    usersOk,
    adminOk
}