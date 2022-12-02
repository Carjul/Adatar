const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

function createpemsun(params) {

    params.map(async (e) => {

       /*  let dato = await Pensums.findAll({
            where: { [Op.and]: [{ Pensum: e.Pensum }, { Semestres: e.Semestres }] }


        })
        if (dato.lenth === 0) {
         
        } */
            const relacion = await Programas.findOne({ where: { NombrePrograma: e.NombrePrograma } })

           /*  const pem = await Pensums.create({
                Pensum: e.Pensum,
                Semestres: e.Semestres,
            })

            relacion.addPensum(pem)
      */
console.log(relacion)

    })
    return "saved pensum";
}

module.exports = createpemsun;