const { Facultades } = require("../db");

const crearfacultad= async(params)=> {
    
for (let i = 0; i < params.length; i++) {
const {NombreFacultad}= params[i]
    await Facultades.findOrCreate({
        where: {
             NombreFacultad
        }

 })
}

        

   return "saved facultades";     
}

module.exports = crearfacultad;