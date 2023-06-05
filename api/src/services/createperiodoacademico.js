const { Op } = require("sequelize");
const { PeriodoAcademicos } = require("../db");

const createPeriodoAcademico = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { Año, Periodo,NomNotaPeriodo } = params[i]

           const existe = await PeriodoAcademicos.findOne({
                where: {
                    [Op.and]: [{Year: Año }, { Periodo},{NomNotaPeriodo}]
                }
           })
           if (!existe) {
            await PeriodoAcademicos.findOrCreate({
                where: {
                    Year:Año,
                    Periodo,
                    NomNotaPeriodo
                }
            })
           }
        }
        return "Saved PeriodoAcademicos"
    } catch (error) {
        console.log(error)
    }
}

module.exports = createPeriodoAcademico;