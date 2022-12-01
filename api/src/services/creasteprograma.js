const {Programas} = require('../db');

function createprograma(params) {
    
         params.map(  async(e)=>{ 
            await Programas.create({
            
                 NombrePrograma:e.Programa,
                 NombreCorto:e.NombreCorto,
                 NombreMuyCorto:e.NombreMuyCorto,
                 FacultadeFacultadId:e.Facultad_id
             })
             
        })
return "saved programas";
}
module.exports = createprograma;