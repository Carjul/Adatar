const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Pensums', {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Pensum:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Semestres:{
            type:DataTypes.STRING,
            allowNull: true
        }
        
    });
}