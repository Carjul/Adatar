const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('MateriaPorPensums',{
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