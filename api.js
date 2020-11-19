const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

//llamo a modules de funciones y middlewares
const productos = require('./funciones/productos');
const usuarios = require('./funciones/usuarios');
const pedidos = require('./funciones/pedidos');
const { usersOk, adminOk } = require('./funciones/middlewares');

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Endpoints productos
app.get('/productos', usersOk, productos.verProductos);
app.get('/productos/:productoId', usersOk, productos.verProductoId);
app.post('/productos', usersOk, adminOk, productos.agregarProducto);
app.put('/productos/:productoId', usersOk, adminOk, productos.modificarProducto);
app.delete('/productos/:productoId', usersOk, adminOk, productos.eliminarProducto);

//Endpoints usuarios
app.get('/usuarios', usersOk, adminOk, usuarios.verUsuarios);
app.post('/usuario/signup', usuarios.nuevoUsuario);
app.post('/usuario/login', usuarios.logInUsuario);

//Endpoints pedidos
app.get('/pedidos', usersOk, adminOk, pedidos.verPedidos);
app.get('/pedidos/:pedidoId', usersOk, pedidos.verPedidoId);
app.post('/pedidos', usersOk, pedidos.crearPedido);
app.put('/pedidos/:pedidoId', usersOk, adminOk, pedidos.modificarPedido);
app.delete('/pedidos/:pedidoId', usersOk, adminOk, pedidos.eliminarPedido);


//Servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor escuchando en puerto " + process.env.PORT);
});