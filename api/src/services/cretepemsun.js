const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

const createpemsun = async (params) => {
    try {
        for (let index = 0; index < params.length; index++) {

            const { NombrePrograma, Sede, Pensum, Semestres } = params[index];

            const existe = await Pensums.findOne({
                where: {
                    Pensum 
                }
            })

            if (!existe) {

                const programa = await Programas.findOne({
                    where: {
                        [Op.and]: [{ NombrePrograma }, { Sede }]
                    }
                })
                const pensum = await Pensums.create({
                    Pensum,
                })

                await pensum.setPrograma(programa)
            }

        }

        return "saved pensum";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createpemsun;