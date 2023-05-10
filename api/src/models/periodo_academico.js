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
            allowNull: true
        },
        Periodo:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}