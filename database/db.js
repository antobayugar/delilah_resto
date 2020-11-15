const { Sequelize, DataTypes, Op } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

/* const sequelize = new Sequelize('delilah_resto', 'antonella', 'wL242JdHVvg8c45P', {
  host: "192.168.64.2",
  dialect: "mysql",
}); */

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

async function conectar() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

conectar();

sequelize.sync({ force: false })
  .then(() => { console.log("Tablas sincronizadas"); })
  .catch((err) => { console.log("Tablas no sincronizadas, error: ", err); })

module.exports = {
  sequelize,
  DataTypes,
  Op
}