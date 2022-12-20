import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    facultad: [],
    pensum: [],
    materias: [],
    materiaPorPensum: [],
    estudiantes: [],
    docentes: [],
    programa: [],
    periodoAcademico: [],
    notas: [],
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setNota: (state, action) => {
            state.notas = action.payload
        },
        setPeriodo:(state, action)=>{
            state.periodoAcademico = action.payload
        },
        setPrograma: (state, action) => {
            state.programa=action.payload
        },
        setDocente: (state, action) => {
            state.docentes= action.payload
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
        }
    }
})

export default dataSlice.reducer
export const { setNota,setPeriodo,setPrograma,setDocente,setEstudiante,setMateriaPorPensum, setMateria, setPensum,setFacultad } = dataSlice.actions