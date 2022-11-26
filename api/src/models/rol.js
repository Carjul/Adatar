const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Rols',{
        
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rol:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}