const {Materias } = require("../db");

const createMaterias= async(params)=>{
    
    for (let i = 0; i < params.length; i++) {
        const {CodigoMateria,NombreMateria,Seccion,TipoMateria}= params[i]
          
        await Materias.findOrCreate({
            where:{
                CodigoMateria:`${CodigoMateria}`,
                NombreMateria,
                Seccion,
                TipoMateria
            }
        })
    }

    return "saved materias";
}

module.exports = createMaterias;

