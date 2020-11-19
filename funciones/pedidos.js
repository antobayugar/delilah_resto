const { Pedidos, Pedido_detalles } = require('../database/models');
const { sequelize, QueryTypes } = require('../database/db');


//fx para crear un nuevo pedido
const crearPedido = async function crearPedido(req, res) {
    var pedidoId;
    //obtengo el usuario que quiere realizar el pedido
    var userId = req.user.datosUsuario.id_usuario;

    //creo un pedido nuevo relacionado a ese usuario
    await Pedidos.create({
        id_estado: 1,
        id_pago: req.body.id_pago,
        id_usuario: userId
    })
        .then((data) => {
            pedidoId = JSON.stringify(data.dataValues.id_pedido);
            req.body.detalles.forEach(detalle => {
                Pedido_detalles.create({
                    id_pedido: pedidoId,
                    id_producto: detalle.id_producto,
                    cantidad_producto: detalle.cantidad_producto
                })
            })

        })

        .then(result => {
            return res.status(200).json({ msg: 'Pedido creado exitosamente.', id_pedido: pedidoId });
        })

        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Pedido no creado.');
        })
};
 
//fx para ver todos los pedidos realizados
const verPedidos = async function verPedidos(req, res) {
    //valido que existan pedidos
    await Pedidos.findAll()
        .then(data => {
            if (data === null) {
                //si no existen, devuelvo el mensaje
                return res.status(404).send('Error 404. Lista de pedidos no encontrada.');
            } else {
                //si existen, devuelvo la lista
                sequelize.query(`SELECT  
                    ped.id_pedido,
                    ped.fecha_pedido,
                    st.estado,
                    tp.tipo_pago,
                    pr.nombre,
                    det.cantidad_producto,
                    pr.precio,
                    pr.precio * det.cantidad_producto subtotal,
                    us.usuario,
                    us.nombre_apellido,
                    us.direccion_envio,
                    us.email
                    FROM pedidos ped
                    INNER JOIN pedido_detalles det ON ped.id_pedido = det.id_pedido 
                    INNER JOIN productos pr ON det.id_producto = pr.id_producto
                    INNER JOIN usuarios us ON us.id_usuario = ped.id_usuario
                    INNER JOIN pedido_tiposdepagos tp ON tp.id_pago = ped.id_pago
                    INNER JOIN pedido_estados st ON st.id_estado = ped.id_estado`,
                    { type: QueryTypes.SELECT })
                    .then(data => {
                        return res.status(200).json({ msg: 'Lista de pedidos traídos exitosamente.', pedidos: data });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
};

//fx para ver todos el pedido del usuario
const verPedidoId = async function verPedidoId(req, res) {
    const pedidoId = req.params.pedidoId;

    //validacion: busco el pedido id
    await Pedidos.findByPk(pedidoId)
        .then(data => {
            if (data === null) {
                //si no se encuentra, devuelvo pedido no encontrado
                return res.status(404).send('Error 404. Pedido no encontrado.');
            } else {
                //si se encuentra, hago el query 
                sequelize.query(`SELECT  
                ped.id_pedido,
                st.estado,
                pr.nombre,
                det.cantidad_producto,
                pr.precio,
                pr.precio * det.cantidad_producto subtotal
                FROM pedidos ped
                INNER JOIN pedido_detalles det ON ped.id_pedido = det.id_pedido
                INNER JOIN productos pr ON det.id_producto = pr.id_producto
                INNER JOIN pedido_estados st ON st.id_estado = ped.id_estado
                WHERE ped.id_pedido = ${pedidoId}`,
                    { type: QueryTypes.SELECT })
                    .then(data => {
                        return res.status(200).json({ msg: 'Pedido traído exitosamente.', pedido: data });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};

//fx para actualizar el estado de un pedido
const modificarPedido = async function modificarPedido(req, res) {
    //obtengo el pedido a modificar con su param id
    //valido que exista el pedido
    const pedidoId = req.params.pedidoId;

    //validacion: busco el pedido id
    await Pedidos.findByPk(pedidoId)
        .then(data => {
            if (data === null) {
                //si no se encuentra, devuelvo pedido no encontrado
                return res.status(404).send('Error 404. Pedido no encontrado.');
            } else {
                //si se encuentra, hago el update
                Pedidos.update({
                    id_estado: req.body.estado_nuevo
                }, {
                    where: {
                        id_pedido: pedidoId
                    }
                })
                    .then(data => {
                        return res.status(200).json({ msg: 'Estado del pedido actualizado exitosamente.', pedido: pedidoId });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};

//fx para eliminar un pedido
const eliminarPedido = async function eliminarPedido(req, res) {
    //obtengo el pedido a eliminar con su param id
    //valido que exista el pedido
    const pedidoId = req.params.pedidoId;

    //validacion: busco el pedido id
    await Pedidos.findByPk(pedidoId)
        .then(data => {
            if (data === null) {
                //si no se encuentra, devuelvo pedido no encontrado
                return res.status(404).send('Error 404. Pedido no encontrado.');
            } else {
                //si se encuentra, hago el delete
                Pedidos.destroy({
                    where: {
                        id_pedido: pedidoId
                    }
                })
                    .then(data => {
                        return res.status(200).json({ msg: 'Pedido eliminado exitosamente.', pedido: pedidoId });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(400).send('Error 400. Intente nuevamente.');
                    })
            }
        })
        .catch(err => {
            console.log(err);
            return res.status(400).send('Error 400. Intente nuevamente.');
        })
};


module.exports = {
    crearPedido,
    verPedidos,
    verPedidoId,
    modificarPedido,
    eliminarPedido
}