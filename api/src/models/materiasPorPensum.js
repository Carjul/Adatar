const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('MateriaPorPensums',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Seme:{
            type: DataTypes.STRING,
            allowNull: false
        },
        SemMateriaNum:{
            type: DataTypes.STRING,
            allowNull: false
        }

    });
}