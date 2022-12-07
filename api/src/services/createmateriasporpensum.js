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

            const existe = await MateriaPorPensums.findOne({
                where: {
                    [Op.and]: [{ SemMateriaNum: `${SemMateriaNum}` }, { Seme: `${Seme}`, }]
                }
            })

            if (!existe) {
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

                const materiaPensum = await MateriaPorPensums.create({
                    SemMateriaNum: `${SemMateriaNum}`,
                    Seme: `${Seme}`,
                })

                pensum.addMateriaPorPensums(materiaPensum)
                materia.addMateriaPorPensums(materiaPensum)
            }

            

        }
        return "Saved Materiasporpensum "
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMateriaspensun;