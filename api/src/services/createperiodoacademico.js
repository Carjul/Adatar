
const {db} = require("../db");

const createPeriodoAcademico = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { Año, Periodo,NomNotaPeriodo } = params[i]

           const existe = await db.query(`SELECT * FROM public."PeriodoAcademicos" WHERE "Year" = $1 AND "Periodo" = $2 AND "NomNotaPeriodo" = $3`, [Año, Periodo,NomNotaPeriodo])
           if (existe.rows.length === 0) {
            await db.query(`INSERT INTO public."PeriodoAcademicos"("Year", "Periodo", "NomNotaPeriodo") VALUES ($1, $2, $3)`, [Año, Periodo,NomNotaPeriodo])
           }
        }
        return "Saved PeriodoAcademicos"
    } catch (error) {
        console.log(error)
    }
}

module.exports = createPeriodoAcademico;