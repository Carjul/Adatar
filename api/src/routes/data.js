const {Router} = require('express');
const {State} = require('../controllers/graficos');
const routerData = Router();

routerData.get('/data', (req, res) => {
    setPrograma({programa: State.programa, notas: State.notas})
    res.json({
        data: State.notasperpro
    })
})

module.exports ={ routerData };

const setPrograma = (params) => {
     
    const arreglo = [
        { value: [], name: "Cero" },
        { value: [], name: "Muy Baja" },
        { value: [], name: "Baja" },
        { value: [], name: "Media" },
        { value: [], name: "Alta" },
        { value: [], name: "Muy Alta" },
    ]
    const arr = []

    for (let i = 0; i < params.programa.length; i++) {
        const ele = params.programa[i];
        params.notas.forEach((e) => {

            if (e.ProgramaId === ele.id && e.Nota == 0.0) {
                arreglo[0].value.push(e)
            }
            if (e.ProgramaId === ele.id && e.Nota > 0.0 && e.Nota < 2.0) {
                arreglo[1].value.push(e)
            }
            if (e.ProgramaId === ele.id && e.Nota >= 2 && e.Nota < 3.0) {
                arreglo[2].value.push(e)
            }
            if (e.ProgramaId === ele.id && e.Nota >= 3.0 && e.Nota < 4.0) {
                arreglo[3].value.push(e)
            }
            if (e.ProgramaId === ele.id && e.Nota >= 4.0 && e.Nota < 4.5) {
                arreglo[4].value.push(e)
            }
            if (e.ProgramaId === ele.id && e.Nota >= 4.5 && e.Nota <= 5.0) {
                arreglo[5].value.push(e)
            }
        })

    }

    for (let i = 0; i < arreglo.length; i++) {
        const element = arreglo[i];
        arr.push({ value: element.value.length, name: element.name })
    }
    State.notasperpro = arr
}