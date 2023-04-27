import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
    notasmateria: [],
    notastate: [],
    notasemestre: [],
    notasperpro: [],
    notasperma: {},//notas por materia
    semestres: [],
    notas_estudiantes:[],
    notas_del_semestre:[],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setNota: (state, action) => {
            state.notas = action.payload
        },
        setPeriodo: (state, action) => {
            state.periodoAcademico = action.payload
        },
        setNotasperma: (state, action) => {
            const notas_por_materia = {
                Materia: [],
                Gano: [],
                Perdio: [],
            }
            const notas = []
            const arregloRepetidos = []
            const materias = []
            state.notas.forEach(e => {
                if (e.ProgramaId === action.payload) {
                    notas.push(e)
                }
            })
            state.notas_del_semestre = notas

            for (let i = 0; i < notas.length; i++) {
                const element = notas[i];
                state.materias.forEach(e => {
                    if (e.id === element.MateriaId) {
                        arregloRepetidos.push(e)
                    }
                })
            }
            
            for (var j = 0; j < arregloRepetidos.length; j++) {
                var objeto = arregloRepetidos[j];
                if (materias.indexOf(objeto) === -1) {
                    materias.push(objeto);
                }
            }

             for (let i = 0; i < materias.length; i++) {
                const element = materias[i];
                notas_por_materia.Materia.push(element.NombreMateria)
                const Gano = []
                const Perdio = []
                notas.forEach(e => {
                    if (element.id === e.MateriaId) {

                        if (e.Gano === 1) {
                            Gano.push(e)
                        } else {
                            Perdio.push(e)
                        }
                    }
                })

                notas_por_materia.Gano.push(Gano.length)
                notas_por_materia.Perdio.push(Perdio.length)

            } 
            
            state.notasperma = notas_por_materia
        },
        setSede: (state, action) => {
            var sedes = []
            action.payload?.forEach(e => {
                sedes.push(e.Sede)
            });
            state.sede = sedes.filter((item, index) => {
                return sedes.indexOf(item) === index;
            })
        },
        setPrograma: (state, action) => {
            state.programa = action.payload
            const arreglo = [
                { value: [], name: "Cero" },
                { value: [], name: "Muy Baja" },
                { value: [], name: "Baja" },
                { value: [], name: "Media" },
                { value: [], name: "Alta" },
                { value: [], name: "Muy Alta" },
            ]
            const arr = []

            for (let i = 0; i < state.programa.length; i++) {
                const ele = state.programa[i];
                state.notas.forEach((e) => {

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
            state.notasperpro = arr
        },
        setDocente: (state, action) => {
            state.docentes = action.payload
        },
        setEstudiante: (state, action) => {
            state.estudiantes = action.payload
        },
        setMateriaPorPensum: (state, action) => {
            state.materiaPorPensum = action.payload
        },
        setMateria: (state, action) => {
            state.materias = action.payload
        },
        setPensum: (state, action) => {
            state.pensum = action.payload
        },
        setFacultad: (state, action) => {
            state.facultad = action.payload
        },
        setNotasmateria: (state, action) => {

            const notas_programa = []
            for (let i = 0; i < state.notas.length; i++) {
                const e = state.notas[i];
                if (e.ProgramaId === action.payload) {
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
                state.materiaPorPensum.forEach((e) => {
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




            state.notasmateria = result

        },
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

export default dataSlice.reducer
export const { setNotas_Por_Estudiante,setNotasperma, setNotasmateria, setNotastate, setNota, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions