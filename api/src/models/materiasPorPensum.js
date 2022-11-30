const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('MateriaPorPensums',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CodigoMateria:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}