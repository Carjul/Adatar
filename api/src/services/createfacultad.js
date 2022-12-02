const { Facultades } = require("../db");

const crearfacultad = (params) => {

    params.map(async (facultad) => {

        let dato = await Facultades.findAll({
            where: {
                NombreFacultad: facultad.NombreFacultad
            }
        })
        if (dato.lenth === 0) {
            await Facultades.create({ NombreFacultad: facultad.NombreFacultad });
        }
    })



    return "saved facultades";
}

module.exports = crearfacultad;