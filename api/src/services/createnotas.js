const { db } = require("../db");

const createNotas = async (params) => {
  try {
   

      const {
        GRADE_ACTIVITY,
        FINAL_GRADE,
        Nota,
        Gano,
        Perdio,
        Rango,
        ProxNotaMin,
        Seccion,
        NombrePrograma,
        Sede,
        CodigoMateria,
        Identificacion,
        Cog_Docente,
        Nom_Docente,
        Periodo,
        Año,
        NomNotaPeriodo
      } = params;

    
      const programa = await db.query(
        'SELECT * FROM public."Programas" WHERE "NombrePrograma" = $1 AND "Sede" = $2',
        [NombrePrograma, Sede]
      );

      const materia = await db.query(
        'SELECT * FROM public."Materias" WHERE "CodigoMateria" = $1',
        [CodigoMateria]
      );

      const estudent = await db.query(
        'SELECT * FROM public."Estudiantes" WHERE "Identificacion" = $1',
        [Identificacion]
      );

      const docente = await db.query(
        'SELECT * FROM public."Docentes" WHERE "Cog_Docente" = $1 AND "Nom_Docente" = $2',
        [Cog_Docente, Nom_Docente]
      );

      const periodo = await db.query(
        'SELECT * FROM public."PeriodoAcademicos" WHERE "Year" = $1 AND "Periodo" = $2 AND "NomNotaPeriodo" = $3',
        [Año, Periodo, NomNotaPeriodo]
      );

      if (
        programa.rows.length !== 0 &&
        materia.rows.length !== 0 &&
        estudent.rows.length !== 0 &&
        docente.rows.length !== 0 &&
        periodo.rows.length !== 0
      ) {
        const selectQuery = await db.query(
          `SELECT * FROM public."Notas"
           WHERE "GRADE_ACTIVITY" = $1
           AND "FINAL_GRADE" = $2
           AND "Nota" = $3
           AND "Gano" = $4
           AND "Perdio" = $5
           AND "Rango" = $6
           AND "ProxNotaMin" = $7
           AND "Seccion" = $8
           AND "EstudianteId" = $9
           AND "MateriaId" = $10
           AND "ProgramaId" = $11
           AND "DocenteId" = $12
           AND "PeriodoAcademicoId" = $13`,
          [
            GRADE_ACTIVITY,
            FINAL_GRADE,
            Nota,
            Gano,
            Perdio,
            Rango,
            ProxNotaMin,
            Seccion,
            estudent.rows[0].id,
            materia.rows[0].id,
            programa.rows[0].id,
            docente.rows[0].id,
            periodo.rows[0].id
          ]
        );

        if(selectQuery.rows.length === 0){
       await db.query(
          `INSERT INTO public."Notas"("GRADE_ACTIVITY", "FINAL_GRADE", "Nota", "Gano", "Perdio", "Rango", "ProxNotaMin", "Seccion", "EstudianteId", "MateriaId", "ProgramaId", "DocenteId", "PeriodoAcademicoId") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            GRADE_ACTIVITY,
            FINAL_GRADE,
            Nota,
            Gano,
            Perdio,
            Rango,
            ProxNotaMin,
            Seccion,
            estudent.rows[0].id,
            materia.rows[0].id,
            programa.rows[0].id,
            docente.rows[0].id,
            periodo.rows[0].id
          ]
        );
        }
      }
    

  } catch (error) {
    console.log(error);
    return "Ocurrió un error al guardar las notas";
  }
};

module.exports = createNotas;
