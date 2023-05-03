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
            setNotasmateria(element.id)
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



const setNotasmateria= (id) => {

    const notas_programa = []
    for (let i = 0; i < State.notas.length; i++) {
        const e = State.notas[i];
        if (e.ProgramaId === id) {
            notas_programa.push(e)
        }
    }

    const Cero = [[], [], [], [], [], [], [], [], [], []]
    const MuyBaja = [[], [], [], [], [], [], [], [], [], []]
    const Baja = [[], [], [], [], [], [], [], [], [], []]
    const Medio = [[], [], [], [], [], [], [], [], [], []]
    const Alta = [[], [], [], [], [], [], [], [], [], []]
    const MuyAlta = [[], [], [], [], [], [], [], [], [], []]

    for (let i = 0; i < notas_programa.length; i++) {
        const element = notas_programa[i];
        State.materiaPorPensum.forEach((e) => {
            var index = parseInt(e.SemMateriaNum) - 1;

            if (!isNaN(index) && e.MateriaId === element.MateriaId) {

                if (element.Nota == 0.0) {
                    Cero[index].push(element)
                }
                if (element.Nota > 0.0 && element.Nota < 2.0) {
                    MuyBaja[index].push(element)
                }
                if (element.Nota >= 2.0 && element.Nota < 3.0) {
                    Baja[index].push(element)
                }
                if (element.Nota >= 3.0 && element.Nota < 4.0) {
                    Medio[index].push(element)
                }
                if (element.Nota >= 4.0 && element.Nota < 4.5) {
                    Alta[index].push(element)
                }
                if (element.Nota >= 4.5 && element.Nota <= 5.0) {
                    MuyAlta[index].push(element)
                }

            }
        })

    }

    const materias = [Cero, MuyBaja, Baja, Medio, Alta, MuyAlta]
    var result = []
    for (let i = 0; i < materias.length; i++) {
        const element = materias[i];
        const num = []
        element.forEach((e) => {
            num.push(e.length)
        })
        result.push(num)
    }

    State.notasmateria.push(result)
    console.log(State.notasmateria)
}
/* 
 
        setNotastate: (state, action) => {//datos para la tabla de estidiantes por semestre
    
            let Notasperma = []
            const result = []
           const semestres = []


            state.materiaPorPensum.forEach((e) => {
                 if(e.PensumId=== action.payload ){
                    Notasperma.push(e)
                 }
            })
            state.notasemestre= Notasperma

             for (let i = 0; i <Notasperma.length; i++) {
                const element =Notasperma[i];
              
                if(!isNaN(element.SemMateriaNum)){
                    let num =parseInt(element.SemMateriaNum)
                    semestres.push(num)

                }
                
            }
            const elementosUnicos = [];  
            semestres.forEach(num => { 
              if (!elementosUnicos.includes(num)) {  
                elementosUnicos.push(num);  
              }
            })
            
            state.semestres= elementosUnicos.sort()

           

        },
setNotas_Por_Estudiante:(state,action)=>{
    
 
function filtrarNotasPorSemestre(semestre) {


  // Filtramos las materias del pensum que tienen el semestre buscado
  const materiasFiltradas = [];
    for (let i = 0; i < state.notasemestre.length; i++) {
      if (state.notasemestre[i].SemMateriaNum === `${semestre}`) {
        materiasFiltradas.push(state.notasemestre[i]);
      }
    }
  
  // Filtramos los estudiantes que corresponden a las materias filtradas
  const estudiantesFiltrados = [];
    for (let i = 0; i < state.estudiantes.length; i++) {
      if (materiasFiltradas.some(materia => materia.PensumId === state.estudiantes[i].PensumId)) {
        estudiantesFiltrados.push(state.estudiantes[i]);
      }
    }
  
  
  const uniqueIds = {};
const estudiantes = estudiantesFiltrados.filter(obj => {
  if (!uniqueIds[obj.id]) {
    uniqueIds[obj.id] = true;
    return true;
  }
  return false;
});

// Filtramos las notas que corresponden a los estudiantes filtrados
  const notasFiltradas = [];
    for (let i = 0; i < state.notas.length; i++) {
      if (estudiantes.some(estudiante => estudiante.id === state.notas[i].EstudianteId)) {
        notasFiltradas.push(state.notas[i]);
      }
    } 

const estudiantesConNotas = [];
for (let i = 0; i < estudiantes.length; i++) {
  const estudiante = estudiantes[i];
  const notasEstudiante = notasFiltradas.filter(nota => nota.EstudianteId === estudiante.id);
  estudiantesConNotas.push({ estudiante, notas: notasEstudiante });
}

// Devolvemos el resultado como un objeto que contiene las materias, estudiantes y notas filtradas
return estudiantesConNotas



}

const notasemestre = filtrarNotasPorSemestre(action.payload)
const data = []
 for (let j = 0; j < notasemestre.length; j++) {
    const element = notasemestre[j];
    let perdidos = element.notas.filter(nota => nota.Perdio === 1 )
    if(perdidos.length>0){
        
        data.push([perdidos.length, perdidos.length,element.estudiante.Nombres])
    }
 }
state.notas_estudiantes= data
    }

    }
})  
*/


module.exports = { State ,BusquedaDB}