const { Facultades } = require("../db");

const crearfacultad= async(params)=> {
    
    await Facultades.bulkCreate(params, {
        ignoreDuplicates: true,
    })
        

   return "saved facultades";     
}

module.exports = crearfacultad;