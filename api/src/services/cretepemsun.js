 
const { db } = require("../db");

const createpemsun = async (params) => {
    try {
        for (let index = 0; index < params.length; index++) {

            const { NombrePrograma, Sede, Pensum, Semestres } = params[index];

            const existe = await db.query(`SELECT * FROM public."Pensums" WHERE "Pensum" = $1`, [Pensum])

            if (existe.rows.length === 0) {

                const programa =await db.query(`SELECT * FROM public."Programas" WHERE "NombrePrograma" = $1 AND "Sede" = $2`, [NombrePrograma, Sede])
                if (programa.rows.length !== 0) {
            await db.query(`INSERT INTO public."Pensums"("Pensum", "Semestres", "ProgramaId") VALUES ($1, $2, $3) RETURNING *`, [Pensum,null, programa.rows[0].id ])
                }
            }

        }

        return "saved pensum";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createpemsun;