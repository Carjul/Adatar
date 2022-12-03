const { Docentes } = require("../db");

const createDocente= async(params)=>{
    for (let i = 0; i < params.length; i++) {
        const {Cog_Docente,Nom_Docente}= params[i]
          
        await Docentes.findOrCreate({
            where:{
                Cog_Docente,
                Nom_Docente
            }
        })
    }
    return "Docentes creados"
}

module.exports = createDocente;