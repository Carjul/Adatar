const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Programas', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        NombrePrograma:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Sede:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Sesion:{
            type:DataTypes.STRING,
            allowNull: false
        }
        
    });
}