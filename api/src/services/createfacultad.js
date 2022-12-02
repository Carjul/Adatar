const { Facultades } = require("../db");

const crearfacultad = (params) => {

    params.map(async (facultad) => {

        let dato = await Facultades.findOne({
            where: {
                NombreFacultad: facultad.NombreFacultad
            }
        })
        if (dato) {
            console.log("ya existe la facultad")

        }
        else {
            await Facultades.create({ NombreFacultad: facultad.NombreFacultad });
        }
    })



    return "saved facultades";
}

module.exports = crearfacultad;