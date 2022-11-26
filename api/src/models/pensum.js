const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Pensums', {
        Pensum_id:{
            type:DataTypes.STRING,
            primaryKey: true
        },
        NombrePensum:{
            type:DataTypes.STRING,
            allowNull: false
        },
        Semestres:{
            type:DataTypes.INTEGER,
            allowNull: false
        }
        
    });
}