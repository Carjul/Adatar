const { Op } = require('sequelize');
const { Programas, Facultades } = require('../db');

const createprograma = async (params) => {
     try {
          for (let i = 0; i < params.length; i++) {
     const { NombrePrograma, Sede, Sesion, NombreFacultad } = params[i]
         
     const existe = await Programas.findOne({
               where: {
                    [Op.and]:[{NombrePrograma},{Sede}]
               }
          })

          if (!existe) {
              

               const facultad = await Facultades.findOne({
                    where: {
                         NombreFacultad
                    }
               })

             const Programa=  await Programas.create({
               
                    NombrePrograma: NombrePrograma,
                    Sede: Sede,
                    Sesion: Sesion,
                    

          })
          await Programa.setFacultad(facultad)
          }

          };

          return "saved programas";
     } catch (error) {
          console.log(error)
     }

}

module.exports = createprograma;