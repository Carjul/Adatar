const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Programas', {
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