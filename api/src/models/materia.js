const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Materias',{
        CodigoMateria:{
            type:DataTypes.STRING,
            allowNull: false
        },
        NombreMateria:{
            type:DataTypes.STRING,
            allowNull: false
        },
       TipoMateria:{
        type:DataTypes.STRING,
        allowNull: false
       }     
    })
}