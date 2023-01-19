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
    notasperpro: [],
    notasperma: [],
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
            const arreglo=[]
            const arr = []
            for (let i = 0; i < action.payload.length; i++) {
                const e = action.payload[i];
      
                state.notas.forEach(element => {
                if(element.ProgramaId === e.id && element.Gano === 0) {
                    arr.push(element)
                };
            })
           
            arreglo.push({ value: arr.length, name:  e.NombrePrograma })
        }
        state.notasperpro = arreglo
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
                if (e.ProgramaId === action.payload && e.Gano=== 0) notas_programa.push(e)
            }

            const data = []

            for (let i = 0; i < notas_programa.length; i++) {
                const element = notas_programa[i].MateriaId;
                state.materias.forEach(e => e.id === element ? data.push(e) : "")
            }
            const norepeat = []
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if (data.indexOf(e) === i) norepeat.push(e)
            }
            const materias = []
            const materiasdata=[]
            for (let i = 0; i < norepeat.length; i++) {
                const dato =[]
                const e = norepeat[i]
                notas_programa.forEach((el) =>{if(el.MateriaId === e.id)  dato.push(el)})
                materiasdata.push({ value: dato, name: e.NombreMateria, })
                materias.push({ value: dato.length, name: e.NombreMateria, })
            }
            state.notasperma= materiasdata
         
            state.notasmateria = materias

        },
        setNotastate: (state, action) => {
            state.notastate = state.notasmateria.filter(e => {
                return e.nota.Gano === parseInt(action.payload)
            })
        },
        
        
    }
})

export default dataSlice.reducer
export const {  setNotasmateria, setNotastate, setNota, setPeriodo, setPrograma, setDocente, setEstudiante, setMateriaPorPensum, setSede, setMateria, setPensum, setFacultad } = dataSlice.actions