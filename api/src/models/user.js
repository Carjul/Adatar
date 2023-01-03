const {DataTypes} =require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Users',{
        
        id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        Avatar:{
            type:DataTypes.STRING,
            allowNull: true
        },
        Nombre:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Email:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Password:{
            type:DataTypes.STRING,
            allowNull: true
        }

    });
}