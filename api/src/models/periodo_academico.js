const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('PeriodoAcademicos',{
        Year:{
            type:DataTypes.INTEGER,
            allowNull: false
        },
        Periodo:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}