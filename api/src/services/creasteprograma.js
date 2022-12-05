const { where } = require('sequelize');
const { Programas, Facultades } = require('../db');

const createprograma = async (params) => {
     try {
          for (let i = 0; i < params.length; i++) {

               const { NombrePrograma, Sede, Sesion, NombreFacultad } = params[i]

               const facultad = await Facultades.findOne({
                    where: {
                         NombreFacultad
                    }
               })

               await Programas.findOrCreate({
                    where: {
                         NombrePrograma: NombrePrograma,
                         Sede: Sede,
                         Sesion: Sesion,
                         FacultadeId: facultad.id
                    }
               })


          };

          return "saved programas";
     } catch (error) {
          console.log(error)
     }

}

module.exports = createprograma;