const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Docentes',{
        Cog_Docente:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Nom_Docente:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}