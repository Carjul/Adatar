const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

function createpemsun(params) {

    params.map(async (e) => {

        let dato = await Pensums.findAll({
            where: { [Op.and]: [{ Pensum: e.Pensum }, { Semestres: e.Semestres }] }


        })
        if (!dato) {
            console.log("ya existe el pensum")
     
            const relacion = await Programas.findOne({ where: { NombrePrograma: e.NombrePrograma } })

            const pem = await Pensums.create({
                Pensum: e.Pensum,
                Semestres: e.Semestres,
            })

            relacion.addPensum(pem)
        }



    })
    return "saved pensum";
}

module.exports = createpemsun;