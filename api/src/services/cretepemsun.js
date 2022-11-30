const { Pensums } = require("../db");

function createpemsun(params) {
    params.map(async e =>
        await Pensums.create({
            Pensum_id: e.Pensum_id,
            Pensum: e.Pensum,
            Sesion: e.Sesion,
            ProgramaProgramaId: e.Programa_id,
        })
    )

    return "saved pensums";
}

module.exports = createpemsun;