const { Op } = require('sequelize');
const { Programas, Facultades } = require('../db');

function createprograma(params) {

     params.map(async (e) => {

          let dato = await Programas.findAll({
               where: {[Op.and]: [{ NombrePrograma: e.NombrePrograma }, { Sede: e.Sede }, { Sesion: e.Sesion }] }
                 
           })
           if (!dato) {
               
               const relacion = await Facultades.findOne({ where: { NombreFacultad: e.NombreFacultad } })

               const pro= await Programas.create({
                     NombrePrograma: e.NombrePrograma,
                     Sede: e.Sede,
                     Sesion: e.Sesion,
                })
           relacion.addPrograma(pro)
           }
    

     })
     return "saved programas";
}
module.exports = createprograma;