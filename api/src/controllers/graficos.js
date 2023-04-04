const { Notas, Estudiantes, Pensums, Materias, Programas, Docentes, PeriodoAcademicos, MateriaPorPensums, Facultades } = require('../db.js');

const State = {
    facultad: [],
    pensum: [],
    materias: [],
    materiaPorPensum: [],
    estudiantes: [],
    docentes: [],
    programa: [],
    sede: [],
    Programas_sede: [],
    periodoAcademico: [],
    notas: [],
    notas_PeriodoAcademico: [],
    notasmateria: [],
    notastate: [],
    notasemestre: [],
    notasperpro: [], //grafico 1
    notasperma: [],
}

async function BusquedaDB() {
    const periodo = await PeriodoAcademicos.findAll()
    State.periodoAcademico = periodo;
    const notas = await Notas.findAll()
    State.notas = notas;
    const estudiantes = await Estudiantes.findAll()
    State.estudiantes = estudiantes;
    const pensum = await Pensums.findAll()
    State.pensum = pensum;
    const materias = await Materias.findAll()
    State.materias = materias;
    const programa = await Programas.findAll()
    State.programa = programa;
    const docentes = await Docentes.findAll()
    State.docentes = docentes;
    const materiaPorPensum = await MateriaPorPensums.findAll()
    State.materiaPorPensum = materiaPorPensum;
    const facultad = await Facultades.findAll()
    State.facultad = facultad;

    filtroAño(periodo, notas)
    setSede(programa)
}





function filtroAño(años, notas) {

    for (let i = 0; i < años.length; i++) {
        const id = años[i].id;
        const arr = notas.filter(e => e.PeriodoAcademicoId === id)
        State.notas_PeriodoAcademico.push(arr)
    }

}
const setSede = (state) => {
    var sedes = []
    state?.forEach(e => {
        sedes.push(e.Sede)
    });
    State.sede = sedes.filter((item, index) => {
        return sedes.indexOf(item) === index;
    })
    setPrograma_sede({ programa: state, sede: State.sede })
}

const setPrograma_sede = (params) => {

    for (let i = 0; i < params.sede.length; i++) {
        const el = params.sede[i];
        const Programas = params.programa.filter(e => e.Sede === el)
        State.Programas_sede.push({ Sede: el, Programas })
    }
    setNotasperpro({ programa: State.Programas_sede, notas: State.notas })
}

const setNotasperpro = (params) => {
    for (let j = 0; j < params.programa.length; j++) {
        const element = params.programa[j];

        const arreglo = [
            { value: [], name: "Cero" },
            { value: [], name: "Muy Baja" },
            { value: [], name: "Baja" },
            { value: [], name: "Media" },
            { value: [], name: "Alta" },
            { value: [], name: "Muy Alta" },
        ]
        const arr = []

        for (let i = 0; i < element.Programas.length; i++) {
            const ele = element.Programas[i];
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
            const elemen = arreglo[i];
            arr.push({ value: elemen.value.length, name: elemen.name })
        }

        State.notasperpro.push({ Sede: element.Sede, notas: arr })


    }
}






module.exports = { State ,BusquedaDB}