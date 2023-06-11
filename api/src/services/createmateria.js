const e = require("connect-flash");
const {db } = require("../db");

const createMaterias= async(params)=>{
    try {
        for (let i = 0; i < params.length; i++) {
            const {CodigoMateria,NombreMateria,TipoMateria}= params[i]

            existe = await db.query(`SELECT * FROM public."Materias" WHERE "CodigoMateria" = $1`, [`${CodigoMateria}`])
            if (existe.rows.length === 0) {
                await db.query(`INSERT INTO public."Materias"("CodigoMateria", "NombreMateria", "TipoMateria") VALUES ($1, $2, $3)`, [`${CodigoMateria}`,NombreMateria,TipoMateria])
            }

        }
    
        return "saved materias";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMaterias;

