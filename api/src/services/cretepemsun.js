const { Op } = require("sequelize");
const { Pensums, Programas } = require("../db");

const createpemsun= async(params)=> {

for (let index = 0; index < params.length; index++) {
    const {NombrePrograma,Sede,Pensum,Semestres} = params[index];
    const relacion = await Programas.findOne({
             where:{
                [Op.and]:[{NombrePrograma},{Sede}]
             }
        })
    const pensum = await Pensums.create({
             Pensum,
             Semestres:`${Semestres}`
    })
    relacion.addPensum(pensum)
    
}
  
    return "saved pensum";
}

module.exports = createpemsun;