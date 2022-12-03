const { Op } = require("sequelize");
const { MateriaPorPensums, Pensums, Materias } = require("../db");


const createMateriaspensun = async (params) => {
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
            const materiapensum = await MateriaPorPensums.create({
            SemMateriaNum: `${SemMateriaNum}`,
            Seme: `${Seme}`,
        }) 
        
        await materiapensum.setPensum(pensum)
        await materiapensum.setMateria(materia)
     
    }
    return "Materias por pensum saved"
}

module.exports = createMateriaspensun;