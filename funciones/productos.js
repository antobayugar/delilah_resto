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
                res.status(200).json({ msg: 'Producto agregado exitosamente', producto: data });
            })
            .catch(err => {
                console.log(err);
                res.status(400).send('Error 400. Producto no agregado');
            })
    } else {//si ya existe el producto devuelvo error
        res.status(404).send('El producto ingresado ya existe, pruebe con otro');
    }
};

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
                res.status(400).send('Error 400. Producto no actualizado');
            })

        return res.status(200).json({ msg: 'Producto actualizado exitosamente', producto: productoId });

    } else { //si no existe el id del producto, devuelvo error
        res.status(404).send('El producto ingresado no existe. No se actualizó ningun producto.');
    }

};

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
                res.status(400).send('Error 400. Producto no eliminado');
            })

        return res.status(200).json({ msg: 'Producto eliminado exitosamente', producto: productoId });

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