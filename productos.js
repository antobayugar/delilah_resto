const { Sequelize, DataTypes } = require("sequelize");


const Productos = sequelize.define(
    "productos",
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      fecha_salida: {
        type: DataTypes.DATE,
        // allowNull defaults to truec
      },
      estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      plazas_disponibles: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Other model options go here
      timestamps: false,
    }
  );