const { Notas, Programas, Materias, Estudiantes, Docentes, PeriodoAcademicos } = require("../db");
const { Op } = require("sequelize");

const createNotas = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { GRADE_ACTIVITY,
                FINAL_GRADE,
                Nota,
                Gano,
                Perdio,
                Rango,
                ProxNotaMin,
                Seccion,
                NombrePrograma,
                Sede,
                NombreMateria,
                CodigoMateria,
                Identificacion,
                Cog_Docente,
                Nom_Docente,
                Periodo,
                Año } = params[i];

            const programa = await Programas.findOne({
                where: {
                    [Op.and]: [{ NombrePrograma }, { Sede }]
                }
            })

            const materia = await Materias.findOne({
                where: {
                    [Op.and]: [{ NombreMateria }, { CodigoMateria: `${CodigoMateria}` }]
                }
            })

            const estudent = await Estudiantes.findOne({
                where: {
                    Identificacion: `${Identificacion}`
                },
            })

            const docente = await Docentes.findOne({
                where: {
                    [Op.and]: [{ Cog_Docente }, { Nom_Docente }]

                }
            })

            const periodo = await PeriodoAcademicos.findOne({
                where: {
                    [Op.and]: [{ Año }, { Periodo }]
                }
            })

            await Notas.findOrCreate({
                where: {
                    GRADE_ACTIVITY,
                    FINAL_GRADE: `${FINAL_GRADE}`,
                    Nota,
                    Gano,
                    Perdio,
                    Rango,
                    ProxNotaMin: `${ProxNotaMin}`,
                    Seccion,
                    EstudianteId: estudent.id,
                    MateriaId: materia.id,
                    ProgramaId: programa.id,
                    DocenteId: docente.id,
                    PeriodoAcademicoId: periodo.id
                }
            })
        }
        return "saved Notas "
    } catch (error) {
        console.log(error);
    }
}

module.exports = createNotas;
