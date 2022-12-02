const { Programas, Facultades } = require('../db');

function createprograma(params) {

     params.map(async (e) => {
          const relacion = await Facultades.findOne({ where: { NombreFacultad: e.NombreFacultad } }).cath((err) => console.log(err))

         const pro= await Programas.create({
               NombrePrograma: e.NombrePrograma,
               Sede: e.Sede,
               Sesion: e.Sesion,
          })
     relacion.addPrograma(pro)

     })
     return "saved programas";
}
module.exports = createprograma;