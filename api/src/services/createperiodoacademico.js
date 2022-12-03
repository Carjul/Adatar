const { PeriodoAcademicos } = require("../db");

const createPeriodoAcademico= async(params)=>{
    for (let i = 0; i < params.length; i++) {
        const {Año,Periodo}= params[i]
          
        await PeriodoAcademicos.findOrCreate({
            where:{
                Año,
                Periodo
            }
        })
    }
    return "PeriodoAcademicos creados"
}

module.exports = createPeriodoAcademico;