const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Facultades', {
    NombreFacultad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // NombreCortoFacultad: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // }
  });
};