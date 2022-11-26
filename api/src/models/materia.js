const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Materias',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        NombreMateria:{
            type: DataTypes.STRING,
            allowNull: false
        },
        TipoMateria:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
}