const { Facultades } = require("../db");

function crearfacultad(params) {
    params.map( async e=> await Facultades.create(e))

   return "saved facultades";     
}

module.exports = crearfacultad;