const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Notas',{
        GRADE_ACTIVITY:{
            type: DataTypes.STRING,
            allowNull: false
        },
        FINAL_GRADE:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Nota:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Gano:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Perdio:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Rango:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ProxNotaMin:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seccion:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
}