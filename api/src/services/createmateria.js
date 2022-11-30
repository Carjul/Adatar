const {Materias } = require("../db");

function createMaterias(params) {
    params.map(async e=> await Materias.create({
        CodigoMateria:e.CodigoMateria, 
        NombreMateria:e.NombreMateria,
        Seme:e.seme ,
        SemMateriaNum:e.SemestreMateriaNumero,
        PensumPensumId:e.Pensum_id
    }).catch(e=>console.log(e)))

    return "saved materias";
}

module.exports = createMaterias;

