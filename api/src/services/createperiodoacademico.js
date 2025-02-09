
const {db} = require("../db/db.js");

const createPeriodoAcademico = async (params) => {
    try {
            const { Año, Periodo,NomNotaPeriodo } = params

           const existe = await db.query(`SELECT * FROM public."PeriodoAcademicos" WHERE "Year" = $1 AND "Periodo" = $2 AND "NomNotaPeriodo" = $3`, [Año, Periodo,NomNotaPeriodo])
           if (existe.rows.length === 0) {
            await db.query(`INSERT INTO public."PeriodoAcademicos"("Year", "Periodo", "NomNotaPeriodo") VALUES ($1, $2, $3)`, [Año, Periodo,NomNotaPeriodo])
           }
        
    
    } catch (error) {
        console.log(error)
    }
}

module.exports = createPeriodoAcademico;