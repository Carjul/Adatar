const { db} = require('../db');

const createprograma = async (params) => {
     try {
         
     const { NombrePrograma, Sede, Sesion, NombreFacultad } = params
         
     const existe = await db.query(`SELECT * FROM public."Programas" WHERE "NombrePrograma" = $1 AND "Sede" = $2`, [NombrePrograma, Sede])

     if (existe.rows.length === 0) {
          const facultad = await db.query(`SELECT * FROM public."Facultades" WHERE "NombreFacultad" = $1`, [NombreFacultad])
          if (facultad.rows.length !== 0) {
          const facultad_id2 = facultad.rows[0].id
          await db.query(`INSERT INTO public."Programas"("NombrePrograma", "Sede", "Sesion", "FacultadeId") VALUES ($1, $2, $3, $4)`, [NombrePrograma, Sede, Sesion, facultad_id2]);
     }
}

     } catch (error) {
          console.log(error)
     }

}

module.exports = createprograma;