const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Pensums', {
        Pensum:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Semestres:{
            type:DataTypes.STRING,
            allowNull: false
        }
        
    });
}