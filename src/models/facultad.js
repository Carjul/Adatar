const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Facultades', {
    Facultad_id: {
      type: DataTypes.STRING,
      primaryKey: true

    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NombreCorto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
};