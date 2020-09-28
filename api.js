const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const server = express();
server.use(bodyParser.json());
server.use(cors());






//Servidor
server.listen(3001, () => {
  console.log("Servidor en puerto 3001");
});