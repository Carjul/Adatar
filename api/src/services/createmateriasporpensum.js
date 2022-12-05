const { Op } = require("sequelize");
const { MateriaPorPensums, Pensums, Materias } = require("../db");


const createMateriaspensun = async (params) => {
    try {
        for (let i = 0; i < params.length; i++) {
            const { NombreMateria,
                CodigoMateria,
                Pensum,
                Semestres,
                SemMateriaNum,
                Seme } = params[i];
            const pensum = await Pensums.findOne({
                where: {
                    [Op.and]: [{ Pensum }, { Semestres: `${Semestres}` }]
                }
            })

            const materia = await Materias.findOne({
                where: {
                    [Op.and]: [{ NombreMateria }, { CodigoMateria: `${CodigoMateria}` }]
                }
            })

            await MateriaPorPensums.findOrCreate({
                where:
                {
                    SemMateriaNum: `${SemMateriaNum}`,
                    Seme: `${Seme}`,
                    PensumId: pensum.id,
                    MateriaId: materia.id
                }

            })


        }
        return "Saved Materiasporpensum "
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMateriaspensun;