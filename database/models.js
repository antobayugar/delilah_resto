const { sequelize, DataTypes } = require('./db');

const Productos = sequelize.define(
  "productos",
  {
    // Model attributes are defined here
    id_producto: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    precio: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(100),
      allowNull: false,
    }
  },
  {
    // Other model options go here
    timestamps: false,
  }
);

const Usuarios = sequelize.define(
  "usuarios",
  {
    // Model attributes are defined here
    id_usuario: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.INTEGER(100),
      allowNull:false
    },
    direccion_envio: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    admin: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
    }
  },
  {
    // Other model options go here
    timestamps: false,
  }
);


module.exports = {
    Productos,
    Usuarios
}