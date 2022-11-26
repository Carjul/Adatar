const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Programas', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NombrePrograma:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Sede:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Sesion:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
        
    });
}