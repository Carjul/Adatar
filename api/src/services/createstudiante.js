const { db } = require("../db");

const crearstudent = async (params) => {
    try {
            const { People_code_id, TipoDoc, Identificacion, Nombres, EstadoAlumnoPrograma, Semestre, Direccion, Ciudad, Departamento, TelFijo, TelMovil, Email, Genero, SemeNumero, Pensum } = params;
          
            const existe = await db.query(`SELECT * FROM public."Estudiantes" WHERE "Identificacion" = $1`, [Identificacion]);
          
            if (existe.rows.length === 0) {
              const pensum = await db.query(`SELECT * FROM public."Pensums" WHERE "Pensum" = $1`, [Pensum]);
          
              if (pensum.rows.length !== 0) {
                await db.query(`INSERT INTO public."Estudiantes"("TipoDoc", people_code_id, "Identificacion", "Nombres", "EstadoAlumnoPrograma", "Semestre", "Direccion", "Ciudad", "Departamento", "TelFijo", "TelMovil", "Email", "Genero", "SemeNumero", "PensumId")                   
                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`, [TipoDoc, People_code_id, Identificacion, Nombres, EstadoAlumnoPrograma, Semestre, Direccion, Ciudad, Departamento, TelFijo, TelMovil, Email, Genero, SemeNumero, pensum.rows[0].id]);
              }
            }
          
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = crearstudent;
   