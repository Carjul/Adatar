const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Facultades', {
    Facultad_id: {
      type: DataTypes.STRING,
      primaryKey: true

    },
    NombreFacultad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NombreCortoFacultad: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};