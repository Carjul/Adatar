const { Facultades } = require("../db");

const crearfacultad = async (params) => {
try {
    
    for (let i = 0; i < params.length; i++) {
        const { NombreFacultad } = params[i]
        
        await Facultades.findOrCreate({
            where: {
                NombreFacultad
            }

        })
    }

    return "saved facultades";
} catch (error) {
    console.log(error)
}
}

module.exports = crearfacultad;