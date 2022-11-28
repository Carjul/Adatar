const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Pensums', {
        Pensum_id:{
            type:DataTypes.STRING,
            primaryKey: true
        },
        Pensum:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Sesion:{
            type:DataTypes.STRING,
            allowNull: false
        }
        
    });
}