const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

const createpemsun = async (params) => {
    try {
        for (let index = 0; index < params.length; index++) {

            const { NombrePrograma, Sede, Pensum, Semestres } = params[index];

            const programa = await Programas.findOne({
                where: {
                    [Op.and]: [{ NombrePrograma }, { Sede }]
                }
            })
            await Pensums.findOrCreate({
                where: {
                    Pensum,
                    Semestres: `${Semestres}`,
                    ProgramaId: programa.id
                }
            })

        }

        return "saved pensum";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createpemsun;