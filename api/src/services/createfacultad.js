const { Facultades } = require("../db");

const crearfacultad= (params)=> {
    
 params.map( async(facultad) => {

 const dato= await Facultades.findOrCreate({
        where: {
            NombreFacultad: facultad.NombreFacultad
        }
    })
 
   console.log(dato);
 })

        

   return "saved facultades";     
}

module.exports = crearfacultad;