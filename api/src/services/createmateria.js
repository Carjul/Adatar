const e = require("connect-flash");
const {db } = require("../db/db.js");

const createMaterias= async(params)=>{
    try {

            const {CodigoMateria,NombreMateria,TipoMateria}= params;

            existe = await db.query(`SELECT * FROM public."Materias" WHERE "CodigoMateria" = $1`, [`${CodigoMateria}`])
            if (existe.rows.length === 0) {
                await db.query(`INSERT INTO public."Materias"("CodigoMateria", "NombreMateria", "TipoMateria") VALUES ($1, $2, $3)`, [`${CodigoMateria}`,NombreMateria,TipoMateria])
            }

        
    
   
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMaterias;

