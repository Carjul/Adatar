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
  
    return "saved pensum";
}

module.exports = createpemsun;