const { Sequelize, DataTypes, Usuarios } = require('../database/models');

const verUsuarios = async function verUsuarios(req, res) {
    await Usuarios.findAll()
        .then(data => {
            console.log("Endpoint ver usuarios");
            res.status(200).json({ msg: 'Usuarios traídos exitosamente', usuarios: data });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error 400. Lista de usuarios no encontrada');
        })
};

const nuevoUsuario = async function nuevoUsuario(req, res) {
    //validar si el email y usuario ya existen
    var nuevoUsuario = req.body.usuario;
    var nuevoEmail = req.body.email;

    var usuarioValido = await Usuarios.findAll({
        where: {
            usuario: nuevoUsuario,
        }
    });

    var mailValido = await Usuarios.findAll({
        where: {
            email: nuevoEmail,
        }
    });
    //console.log(usuarioValido);

    //si no existen, crear el usuario
    if (usuarioValido.length < 1 && mailValido.length < 1) {
        await Usuarios.create({
            usuario: nuevoUsuario,
            nombre_apellido: req.body.nombre_apellido,
            email: nuevoEmail,
            telefono: req.body.telefono,
            direccion_envio: req.body.direccion_envio,
            pw: req.body.pw
        })
            .then(data => {
                res.status(200).json({ msg: 'Usuario creado exitosamente', usuario: data });
            })
            .catch(err => {
                console.log(err);
                res.status(400).send('Error 400. Usuario no creado');
            })
    } else if (usuarioValido.length >= 1) {
        res.status(404).send('El usuario ingresado ya existe, pruebe con otro');
    } else {
        res.status(404).send('El email ingresado ya existe, pruebe con otro');
    }
};

const logInUsuario = async function logInUsuario(req, res) {
    const usuario = req.body.usuario; //este dato tmb puede ser el email en la tabla
    const pw = req.body.pw;


};

module.exports = {
    verUsuarios,
    nuevoUsuario,
    //logInUsuario
}