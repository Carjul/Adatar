const { db } = require("../db/db.js");

const createDocente = async (params) => {
    try {
  
            const { Cog_Docente, Nom_Docente } = params;
          
            const existe = await db.query(`SELECT * FROM public."Docentes" WHERE "Cog_Docente" = $1 AND "Nom_Docente" = $2`, [Cog_Docente, Nom_Docente]);
          
            if (existe.rows.length === 0) {
              await db.query(`INSERT INTO public."Docentes"("Cog_Docente", "Nom_Docente") VALUES ($1, $2)`, [Cog_Docente, Nom_Docente]);
            }
          
      

    } catch (error) {
        console.log(error)
    }
}

module.exports = createDocente;