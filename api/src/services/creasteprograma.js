const { Programas, Facultades } = require('../db');

const createprograma= async (params)=> {

     for (let i = 0; i < params.length; i++) {
            const {NombrePrograma, Sede, Sesion, NombreFacultad}= params[i]
               const facultad = await Facultades.findOne({
                    where: {
                         NombreFacultad
                    }
               })

               const programacredo = await Programas.create({
                    NombrePrograma,
                    Sede,
                    Sesion,
               })
               
               facultad.addPrograma(programacredo)
     };
   
     return "saved programas"; 
}

module.exports = createprograma;