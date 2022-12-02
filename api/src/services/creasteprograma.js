const { Programas, Facultades } = require('../db');

function createprograma(params) {

     params.map(async (e) => {
          const relacion = await Facultades.findOne({ where: { NombreFacultad: e.NombreFacultad } })

         const p= await Programas.create({
               NombrePrograma: e.NombrePrograma,
               Sede: e.Sede,
               Sesion: e.Sesion,
          })
     relacion.addPrograma(p)

     })
     return "saved programas";
}
module.exports = createprograma;