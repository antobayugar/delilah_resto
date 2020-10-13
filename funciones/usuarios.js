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


module.exports = {
    verUsuarios
}