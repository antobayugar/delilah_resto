const { Sequelize, DataTypes, Productos } = require('../database/models');

const verProductos = async function verProductos(req, res) {
    await Productos.findAll()
        .then(data => {
            res.status(200).json({ msg: 'Productos traídos exitosamente', productos: data });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error 400. Lista de productos no encontrada');
        })
};

const verProductoId = async function verProductoId(req, res) {
    const productoId = req.params.productoId;
    const resultado = await Productos.findByPk(productoId);

    if (resultado === null) {
        res.status(400).send('Error 400. Producto no encontrado');
    } else {
        res.status(200).json({ msg: 'Producto traído exitosamente', producto: resultado });
    }
};

const agregarProducto = async function agregarProducto(req, res) {
    await Productos.create({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    })
        .then(data => {
            res.status(200).json({ msg: 'Producto agregado exitosamente', producto: data });
        })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error 400. Producto no agregado');
        })
};

const modificarProducto = async function modificarProducto(req, res) {
    //obtengo el producto a modificar con su param id
    const productoId = req.params.productoId;

    //reemplazo todos los datos del producto
    await Productos.update({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen
    }, {
        where: {
            id_producto: productoId
        }
    })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error 400. Producto no actualizado');
        })
    res.status(200).json({ msg: 'Producto actualizado exitosamente', producto: productoId });
        
};

const eliminarProducto = async function eliminarProducto(req, res) {
    //obtengo el producto a modificar con su param id
    const productoId = req.params.productoId;
    await Productos.destroy({
        where: {
            id_producto: productoId
        }
    })
        .catch(err => {
            console.log(err);
            res.status(400).send('Error 400. Producto no eliminado');
        })
    res.status(200).json({ msg: 'Producto eliminado exitosamente', producto: productoId });
};


module.exports = {
    verProductos,
    verProductoId,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}