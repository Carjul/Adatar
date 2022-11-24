const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('PeriodoAcademicos',{
        
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Año:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Periodo:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
    });
}