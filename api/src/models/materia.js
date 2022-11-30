const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Materias',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CodigoMateria:{
            type:DataTypes.STRING,
            allowNull: false
        },
        NombreMateria:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Seme:{
            type:DataTypes.STRING,
            allowNull: false
        },
        SemMateriaNum:{
            type:DataTypes.INTEGER,
            allowNull: false
        }      
    })
}