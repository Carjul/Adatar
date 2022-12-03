const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

const createpemsun= async(params)=> {

for (let index = 0; index < params.length; index++) {
    const element = params[index];
    const relacion = await Programas.findOne({ where: { NombrePrograma: element.NombrePrograma } })
    const pensum = await Pensums.create({
        Pensum: element.Pensum,
        Semestres: element.Semestres,
    })
    relacion.addPensum(pensum)
    
}



    //params.map(async (e) => {

       /*  let dato = await Pensums.findAll({
            where: { [Op.and]: [{ Pensum: e.Pensum }, { Semestres: e.Semestres }] }


        })
        if (dato.lenth === 0) {
         
        } */
           // const relacion = await Programas.findOne({ where: { NombrePrograma: e.NombrePrograma } })

           /*  const pem = await Pensums.create({
                Pensum: e.Pensum,
                Semestres: e.Semestres,
            })

            relacion.addPensum(pem)
      */

   // })
    return "saved pensum";
}

module.exports = createpemsun;