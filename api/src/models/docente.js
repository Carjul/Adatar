const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Docentes',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Cog_Docente:{
            type:DataTypes.STRING,
            allowNull: true
        },
        Nom_Docente:{
            type:DataTypes.STRING,
            allowNull: true
        }
    });
}