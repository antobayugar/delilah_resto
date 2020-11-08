const { Productos } = require('../database/models');
const { Sequelize, DataTypes, Op } = require('../database/db');


//fx para ver todos los productos dentro de la tabla Productos
const verProductos = async function verProductos(req, res) {
    await Productos.findAll()
        .then(data => {
            return res.status(200).json({ msg: 'Lista de productos traídos exitosamente.', productos: data });
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Lista de productos no encontrada.');
        })
};


//fx para ver un producto especifico dentro de la tabla Productos, ubicandolo por su Id
const verProductoId = async function verProductoId(req, res) {
    const productoId = req.params.productoId;
    const resultado = await Productos.findByPk(productoId);

    if (resultado === null) {
        return res.status(400).send('Error 400. Producto no encontrado.');
    } else {
        return res.status(200).json({ msg: 'Producto traído exitosamente.', producto: resultado });
    }
};


//fx para ver agregar un producto nuevo a la tabla Productos
const agregarProducto = async function agregarProducto(req, res) {
    //validar si el producto ya existe
    var nuevoProducto = req.body.nombre;
    var productoValido = await Productos.findAll({
        where: {
            nombre: nuevoProducto
        }
    });

    //si no existe, creo el producto
    if (productoValido.length < 1) {
        await Productos.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            imagen: req.body.imagen
        })
            .then(data => {
                return res.status(200).json({ msg: 'Producto agregado exitosamente.', producto: data });
            })
            .catch(err => {
                console.log(err);
                return res.status(400).send('Error 400. Producto no agregado.');
            })
    } else {//si ya existe el producto devuelvo error
        return res.status(404).send('El producto ingresado ya existe, intentá con otro.');
    }
};


//fx para ver modificar un producto dentro de la tabla Productos, ubicandolo por su Id
const modificarProducto = async function modificarProducto(req, res) {
    //obtengo el producto a modificar con su param id
    //valido que exista el producto
    const productoId = req.params.productoId;
    var productoValido = await Productos.findAll({
        where: {
            id_producto: productoId
        }
    });

    //si existe, reemplazo todos los datos del producto
    if (productoValido.length >= 1) {
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
                return res.status(400).send('Error 400. Producto no actualizado.');
            })

        return res.status(200).json({ msg: 'Producto actualizado exitosamente.', producto: productoId });

    } else { //si no existe el id del producto, devuelvo error
        return res.status(404).send('El producto ingresado no existe. No se actualizó ningun producto.');
    }

};


//fx para ver eliminar un producto dentro de la tabla Productos, ubicandolo por su Id
const eliminarProducto = async function eliminarProducto(req, res) {
    //obtengo el producto a eliminar con su param id
    //valido que exista el producto
    const productoId = req.params.productoId;
    var productoValido = await Productos.findAll({
        where: {
            id_producto: productoId
        }
    });

    //si existe, elimino el producto
    if (productoValido.length >= 1) {
        await Productos.destroy({
            where: {
                id_producto: productoId
            }
        })
            .catch(err => {
                console.log(err);
                return res.status(400).send('Error 400. Producto no eliminado.');
            })

        return res.status(200).json({ msg: 'Producto eliminado exitosamente.', producto: productoId });

    } else { //si no existe el id del producto, devuelvo error
        res.status(404).send('El producto ingresado no existe. No se eliminó ningun producto.');
    }
};


module.exports = {
    verProductos,
    verProductoId,
    agregarProducto,
    modificarProducto,
    eliminarProducto
}