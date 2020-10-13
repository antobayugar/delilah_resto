const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const productos = require('./funciones/productos');
const usuarios = require('./funciones/usuarios');
/* const pedidos = require('./funciones/pedidos'); */

const app = express();

app.use(bodyParser.json());
app.use(cors());

//Endpoints productos
app.get('/productos', productos.verProductos);

//Endpoints usuarios
app.get('/usuarios', usuarios.verUsuarios);


//Servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor escuchando en puerto 3001");
});