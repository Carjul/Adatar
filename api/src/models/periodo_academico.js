const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('PeriodoAcademicos',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Year:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Periodo:{
            type:DataTypes.STRING,
            allowNull: false
        },
        NomNotaPeriodo:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}