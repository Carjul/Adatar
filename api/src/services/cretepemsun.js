const { Pensums,Programas } = require("../db");

function createpemsun(params) {

    params.map(async (e) => {


    const relacion = await Programas.findOne({ where: { NombrePrograma:e.NombrePrograma } })

    const pem= await Pensums.findOrCreate({
            where: {
                    Pensum: e.Pensum,
                    Semestres: e.Semestres,
            }
    })
    
    relacion.addPensum(pem)

   
   })
   return "saved pensum";
}

module.exports = createpemsun;