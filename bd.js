const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("delilah_resto", "root", "", {
  host: "192.168.64.2",
  dialect: "mysql",
});

sequelize.sync({ force: false }).then(() => {
    console.log("Tablas sincronizadas");
  });
