const {DataTypes}= require('sequelize')

module.exports=(sequelize)=>{
    sequelize.define('Estudiantepensums',{
        
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rolEstadoAlumnoPrograma:{
            type:DataTypes.STRING,
            allowNull: false
        }
    });
}