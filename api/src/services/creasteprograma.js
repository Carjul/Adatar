const {Programas} = require('../db');

function createprograma(params) {
    
         params.map(  async(e)=>{ 
            await Programas.create({
                 Programa_id:e.Programa_id,
                 Programa:e.Programa,
                 NombreCorto:e.NombreCorto,
                 NombreMuyCorto:e.NombreMuyCorto,
                 FacultadeFacultadId:e.Facultad_id
             })
             
        })
return "saved programas";
}
module.exports = createprograma;