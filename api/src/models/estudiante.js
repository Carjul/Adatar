const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('Estudiantes', {
    id:{
      type:DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    TipoDoc: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    Identificacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    EstadoAlumnoPrograma:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Semestre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    Direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Ciudad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    Departamento:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    TelFijo:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    TelMovil:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    Email:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    Genero:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    SemeNumero:{
        type: DataTypes.STRING, 
        allowNull: false,
    }

  });
};