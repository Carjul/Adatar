const { Facultades } = require("../db");

const crearfacultad= (params)=> {
    
 params.map( async(facultad) => {

    await Facultades.findOrCreate({
        where: {
            NombreFacultad: facultad.NombreFacultad
        }
    })
 

 })

        

   return "saved facultades";     
}

module.exports = crearfacultad;