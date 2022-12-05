const {Materias } = require("../db");

const createMaterias= async(params)=>{
    try {
        for (let i = 0; i < params.length; i++) {
            const {CodigoMateria,NombreMateria,TipoMateria}= params[i]
              
            await Materias.findOrCreate({
                where:{
                    CodigoMateria:`${CodigoMateria}`,
                    NombreMateria,
                    TipoMateria
                }
            })
        }
    
        return "saved materias";
    } catch (error) {
        console.log(error)
    }
}

module.exports = createMaterias;

