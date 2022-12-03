const { Notas } = require("../db");

const createNotas = async (params) => {
    for (let i = 0; i < params.length; i++) {
        const { GRADE_ACTIVITY, FINAL_GRADE, Nota, Gano, Perdio, Rango, ProxNotaMin, seccion } = params[i];
        const notas = await Notas.create({
            GRADE_ACTIVITY: `${GRADE_ACTIVITY}`,
            FINAL_GRADE: `${FINAL_GRADE}`,
            Nota: `${Nota}`,
            Gano: `${Gano}`,
            Perdio: `${Perdio}`,
            Rango: `${Rango}`,
            ProxNotaMin: `${ProxNotaMin}`,
            seccion: `${seccion}`,
        })
    }
    return "Notas saved"
}

module.exports = createNotas;
