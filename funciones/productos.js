const { Sequelize, DataTypes, Productos } = require('../database/models');

const verProductos = async function verProductos(req, res) {
    await Productos.findAll()
    .then(data => {
        console.log("Endpoint ver productos");
        res.status(200).json({ msg: 'Productos traídos exitosamente', productos: data });
    })
    .catch(err => {
        console.log(err);
        res.status(400).send('Error 400. Lista de productos no encontrada');
    })
};


module.exports = {
    verProductos
}