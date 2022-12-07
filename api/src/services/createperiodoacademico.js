const { Op } = require("sequelize");
const { PeriodoAcademicos } = require("../db");

const createPeriodoAcademico = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { Año, Periodo } = params[i]

           const existe = await PeriodoAcademicos.findOne({
                where: {
                    [Op.and]: [{ Año }, { Periodo}]
                }
           })
           if (!existe) {
            await PeriodoAcademicos.findOrCreate({
                where: {
                    Año,
                    Periodo
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