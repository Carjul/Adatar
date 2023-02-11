const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Facultades', {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
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