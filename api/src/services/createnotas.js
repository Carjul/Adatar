const { db } = require("../db");

const createNotas = async (params) => {
  try {
    const notasGuardadas = [];

    for (let i = 0; i < params.length; i++) {
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
      } = params[i];

      // Verificar si la nota ya ha sido guardada previamente
      const notaExistente = await db.query(`SELECT * FROM public."Notas" WHERE "GRADE_ACTIVITY" = $1 AND "FINAL_GRADE" = $2 AND "Nota" = $3 AND "Seccion" = $4`, [GRADE_ACTIVITY, FINAL_GRADE, Nota, Seccion]);

      if (notaExistente.rows.length !== 0) {
        continue; // Saltar al siguiente ciclo si la nota ya existe
      }

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

    return "Saved Notas";
  } catch (error) {
    console.log(error);
    return "Ocurrió un error al guardar las notas";
  }
};

module.exports = createNotas;
