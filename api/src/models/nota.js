const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Notas',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        GRADE_ACTIVITY:{
            type: DataTypes.STRING,
            allowNull: false
        },
        FINAL_GRADE:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Nota:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Gano:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Perdio:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Rango:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ProxNotaMin:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Seccion:{
            type: DataTypes.STRING,
            allowNull: false
        }
        
    })
}