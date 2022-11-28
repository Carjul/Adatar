const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Programas', {
        Programa_id:{
            type:DataTypes.STRING,
            primaryKey: true
        },
        Programa:{
            type:DataTypes.STRING,
            allowNull: false
        },
        NombreCorto:{
            type:DataTypes.STRING,
            allowNull: false
        },
        NombreMuyCorto:{
            type:DataTypes.STRING,
            allowNull: false
        }
        
    });
}