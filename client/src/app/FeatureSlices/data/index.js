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
const estudiantes = []
 
const notas= state.notas_del_semestre

const materias = []
for (let i = 0; i < state.materiaPorPensum; i++) {
    const e = state.materiaPorPensum[i];
   if( e.SemMateriaNum === action.payload){ materias.push(e)}
    
}
var materias_sem=[]
for (let i = 0; i < notas.length; i++) {
    const element = notas[i];
    materias.forEach((e)=>{
        if(e.MateriaId === element.MateriaId){
            materias_sem.push(e)
        }
    })

}

for (let e = 0; e < notas.length; e++) {
    const element = notas[e];
    state.estudiantes.forEach((e)=>{
        if(e.id === element.EstudianteId){
            estudiantes.push(e)
        }
    })
    
}
 
const notas_estudiantes = []

    notas_estudiantes.push({Estudiante:element,Notas:notas})



console.log(notas_estudiantes)
    }
    }
})  

export default dataSlice.reducer
export const { setNotas_Por_Estudiante,setNotasperma, setNotasmateria, setNotastate, setNota, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions