const { Programas, Facultades } = require('../db');

function createprograma(params) {

     params.map(async (e) => {
          const relacion = await Facultades.findOne({ where: { NombreFacultad: e.NombreFacultad } })

         const pro= await Programas.findOrCreate({
                where: {
                         NombrePrograma: e.NombrePrograma,
                         Sede: e.Sede,
                         Sesion: e.Sesion,

                }
         })
     relacion.addPrograma(pro)

     })
     return "saved programas";
}
module.exports = createprograma;