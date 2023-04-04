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
    periodoAcademico: [],
    notas: [],
    notas_PeriodoAcademico: [],
    notasmateria: [],
    notastate: [],
    notasemestre: [],
    notasperpro: [],
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

    filtroAño(periodo,notas )
}
   

    


function filtroAño(años, notas) {
 
   for (let i = 0; i <años.length; i++) {
        const id = años[i].id;
         const arr =notas.filter(e =>  e.PeriodoAcademicoId === id)
        State.notas_PeriodoAcademico.push(arr) 
    }
     
}

BusquedaDB()


 


module.exports = { State }